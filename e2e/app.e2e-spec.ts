import { InvolvePage } from './app.po';

describe('involve App', function() {
  let page: InvolvePage;

  beforeEach(() => {
    page = new InvolvePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
