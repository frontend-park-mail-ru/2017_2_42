import Button from '../../../blocks/button';
import BaseOverlay from '../../../modules/BaseOverlay';
import router from '../../../modules/router';
import ViewService from '../../../services/ViewService';
import userService from '../../../services/userService';
import './UserProfile.scss';

const InfoOverlayTmpl = (require('./UserProfile.pug') as TemplateRenderFunc);

export default class UserProfile extends BaseOverlay {

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

  public async start(data?: any): Promise<void> {
    // return undefined;
    this.RenderOverlay(InfoOverlayTmpl);

    this.backButton = new Button(document
      .querySelector('.main-block__frame__footer__back-section') as HTMLElement);
    this.backButton.onClick(() => router.HideOverlay());

    this.logoutButton = new Button(document
      .querySelector('.main-block__frame__footer__logout-section') as HTMLElement);

    userService.getUser()
      .then((user) => {
        document.querySelector('.main-block__frame__user-block__username').innerHTML = user.username;
        document.querySelector('.main-block__frame__user-block__rating-block__rating-level').innerHTML = `Level: ${user.level}`;
      });
  }

  public async stop(): Promise<void> {
    // return undefined;
  }

  private backButton: Button;
  private logoutButton: Button;
}
