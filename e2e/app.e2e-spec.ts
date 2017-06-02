import { EntityLinkingSamplePage } from './app.po';

describe('entity-linking-sample App', () => {
  let page: EntityLinkingSamplePage;

  beforeEach(() => {
    page = new EntityLinkingSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
