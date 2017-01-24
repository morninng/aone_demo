import { SmccPage } from './app.po';

describe('smcc App', function() {
  let page: SmccPage;

  beforeEach(() => {
    page = new SmccPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
