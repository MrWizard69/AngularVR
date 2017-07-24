import { AngularVRPage } from './app.po';

describe('angular-vr App', () => {
  let page: AngularVRPage;

  beforeEach(() => {
    page = new AngularVRPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
