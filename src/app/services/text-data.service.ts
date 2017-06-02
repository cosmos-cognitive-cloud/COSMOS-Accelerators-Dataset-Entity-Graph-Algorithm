import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { CognitiveApiService } from '../services/cognitive-api.service';
import { DataService } from '../services/data.service';
import { ISentiment } from '../models/sentiment.model';
import { ILanguageDetect } from '../models/language-detection.model';
import { ILanguageKeyPhrase } from '../models/language-keyphrase.model';
import { IBingSpellCheckResult } from '../models/bing-spell-check.model';


import { IEntityLink } from '../models/entity-link.model';
//import { IQNAResponse } from '../models/qnamaker-response.model';
import { ISentenceStructure } from '../models/sentence-structure.model';




@Injectable()
export class TextDataService extends DataService {

    constructor(protected http: Http, private cognitiveApiService: CognitiveApiService) {
        super(http)
    }

    spellCheck(text: string, mode: string) : Promise<IBingSpellCheckResult>
    {
        text = text.replace(" ","+");
        let url = this.bingApiServer + 'spellcheck/v5.0/?mode=' + mode;
        let body = "Text=" + text; 



        return this.postFormData<IBingSpellCheckResult>(url, body, this.cognitiveApiService.subscriptionKeys.bingSpellCheck);
    }

    

    analyzeSentiment(text: string): Promise<ISentiment> {
        let url = this.textApiServer + 'text/analytics/v2.0/sentiment';
        //let body = { documents: [{ language: "en", id: "1", text: text }] };
        let body = { documents: [{ id: "1", text: text }] };
        return this.postAsPromise<ISentiment>(url, body, this.cognitiveApiService.subscriptionKeys.textAnalytics);
    }


    analyzeLanguage(text: string): Promise<ILanguageDetect> {
        let url = this.textApiServer + 'text/analytics/v2.0/languages';
        let body = { documents: [{ id: "1",numberOfLanguagesToDetect: "1",text: text }] };
        return this.postAsPromise<ILanguageDetect>(url, body, this.cognitiveApiService.subscriptionKeys.textAnalytics);
    }

    analyzeKeyPhrases(text: string, language: string ): Promise<ILanguageKeyPhrase> {
        let url = this.textApiServer + 'text/analytics/v2.0/keyPhrases';
        let body = { documents: [{ id: "1", text: text, language: language }] };
        return this
            .postAsPromise<ILanguageKeyPhrase>(url, body, this.cognitiveApiService.subscriptionKeys.textAnalytics);

    }

    linkEntity(text: string): Promise<IEntityLink> {
        let url = this.textApiServer + 'entitylinking/v1.0/link';
        return this.postTextData<IEntityLink>(url, text, this.cognitiveApiService.subscriptionKeys.entityLinking);
    }
/*
    qnaMakerQuery(text: string, questionKey: string): Promise<IQNAResponse> {
        text = "{question:\" " + text + " \" }";
        let url = this.textApiServer + 'qnamaker/v1.0/knowledgebases/' + questionKey + '/generateAnswer';
        return this.postJSONData<IQNAResponse>(url, text, this.cognitiveApiService.subscriptionKeys.qnaMaker);

    }*/

    analyzeSentence(text: string): Promise<Array<ISentenceStructure>> {
        let url = this.textApiServer + 'linguistics/v1.0/analyze';
        let body = {
            language: 'en',
            analyzerIds: [
                '4fa79af1-f22c-408d-98bb-b7d7aeef7f04',
                '22a6b758-420f-4745-8a3c-46835a67c0d2',
                '08EA174B-BFDB-4E64-987E-602F85DA7F72'
            ],
            text: text
        };
        return this.postAsPromise<Array<ISentenceStructure>>(url, body, this.cognitiveApiService.subscriptionKeys.linguistic);
    }
}
