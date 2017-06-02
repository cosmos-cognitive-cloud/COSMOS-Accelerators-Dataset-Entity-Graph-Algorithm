import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLinkingComponent } from './entity-linking.component';

describe('EntityLinkingComponent', () => {
  let component: EntityLinkingComponent;
  let fixture: ComponentFixture<EntityLinkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityLinkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityLinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
