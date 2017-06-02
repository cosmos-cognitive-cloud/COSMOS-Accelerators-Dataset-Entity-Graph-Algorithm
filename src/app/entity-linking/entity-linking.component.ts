import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Component, OnInit } from '@angular/core';

import { CognitiveApiComponent } from '../cognitive-api.component';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { TextDataService } from '../services/text-data.service';
import { CognitiveApiService } from '../services/cognitive-api.service';
import { IEntityLink } from '../models/entity-link.model';

@Component({
    selector: 'entity-link',
    templateUrl: './entity-linking.component.html',
    styleUrls: ['./entity-linking.component.css']
})
export class EntityLinkingComponent extends CognitiveApiComponent implements OnInit {
    entityLink: IEntityLink;
    sample1 = "Mars is the fourth planet from the Sun and the second smallest planet in the Solar System, after Mercury. Named after the Roman god of war, it is often referred to as the \"Red Planet\" because the iron oxide prevalent on its surface gives it a reddish appearance.";
    sample2 = "For months, the four scientific instruments at the heart of the James Webb Space Telescope have been sealed in what looks like a huge pressure cooker. It's a test chamber that simulates the grueling operating conditions they will face after Webb is launched into orbit in 2018. But in fact, \"pressure cooker\" is an apt metaphor for the whole project. The infrared Webb observatory is the biggest, most complex, and most expensive science mission that NASA has ever attempted. Like that of its predecessor, the Hubble Space Telescope, Webb's construction has been plagued by redesigns, schedule slips, and cost overruns that have strained relationships with contractors, international partners, and supporters in the U.S. Congress. Lately the project has largely stuck to its schedule and its $8 billion budget. But plenty could still go wrong, and the stakes are high: Both the future of space-based astronomy and NASA's ability to build complex science missions depend on its success.";
    sample3 = "One of the pioneering polar explorers from the Golden Age of Exploration grew up as a poor orphan in Baltimore, and his achievements later in life were largely ignored because of his race.Matthew Henson was one of the era few African-American explorers, and he may have been the first man, black or white, to reach the North Pole. His grueling adventures alongside US Navy engineer Robert E. Peary are chronicled in these dramatic early photos.Henson was born in 1866. At age 13, as an orphan, he became a cabin boy on a ship, where the vessel captain taught him to read and write. Henson was working as a store clerk in Washington, D.C. in 1887 when he met Peary. Peary hired him as a valet, and the two began a long working relationship that spanned half a dozen epic voyages over two decades.";
    textToAnalyze = "";
    formattedResult: SafeUrl;
    showJSON = false;
    apiTitle = 'Data Entity Graph API';
    apiBackgroundImage = 'https://cosmosstore.blob.core.windows.net/cognitive-creative-content/Page%20Header%20VIdeos/COSMOS-DeeperPersonalization_828';
    apiDescription = "Power your app's data links with named entity recognition and disambiguation.";
    apiReferenceUrl = 'https://dev.projectoxford.ai/docs/services/56f0eabfca730713cc392442';

    showCodeButtons = true;

    public constructor(private titleService: Title, private textDataService: TextDataService, private sanitizer: DomSanitizer, private cognitiveApiService: CognitiveApiService) {
        super();
        this.titleService.setTitle('Data Entity Graph API');
    }

    ngOnInit() {
        this.textToAnalyze = "";
        this.isLoading = false;
        this.insertSample1();
        this.analyzeText();
    }

    public analyzeText() {
        this.refreshDetection();
    }

    public insertSample1() {
        this.textToAnalyze = this.sample1;
        this.analyzeText();
    }

    public insertSample2() {
        this.textToAnalyze = this.sample2;
        this.analyzeText();
    }

    public insertSample3() {
        this.textToAnalyze = this.sample3;
        this.analyzeText();
    }

    public toggleJSON(b: boolean) {
        this.showJSON = b;
    }

    private refreshDetection() {
        this.entityLink = null;
        if (this.textToAnalyze) {
            this.isLoading = true;
            this.textDataService.linkEntity(this.textToAnalyze)
                .then(entityLink => {
                    this.entityLink = entityLink;
                    this.formatResult();
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.errorMessage = error;
                    this.isLoading = false;
                });
        } else {
            this.formatResult();
        }
    }

    private formatResult() {
        let formattedResult = this.textToAnalyze;
        let offset = 0;
        let replacementList: Array<{offset: number, oldText: string, newText: string}> = [];
        if (this.entityLink && this.entityLink.entities) {
            this.entityLink.entities.forEach(entity => {
                entity.matches.forEach(match => {
                    let oldText = match.text;
                    let newText = ` <span class='mention' title='${entity.name}'>${match.text}</span>`;
                    match.entries.forEach(entry => {
                        replacementList.push({offset: entry.offset, oldText: oldText, newText: newText});
                    });
                });
            });
            replacementList.sort((item1, item2) => {
                return item1.offset < item2.offset ? -1 : 1;
            }).forEach(item => {
                formattedResult = this.replaceAt(formattedResult, item.oldText, item.newText, offset + item.offset);
                offset += item.newText.length - item.oldText.length;
            });
        }
        this.formattedResult = this.sanitizer.bypassSecurityTrustHtml(formattedResult);
    }

    private replaceAt(s: string, oldString: string, newString: string, index: number) {
        return s.substr(0, index) + newString + s.substr(index + oldString.length);
    }

    private replaceAll(s: string, oldStr: string, newStr: string, prev = ''): string {
        if (prev && s === prev) {
            return s;
        }
        prev = s.replace(oldStr, newStr);
        return this.replaceAll(prev, oldStr, newStr, s);
    }
}