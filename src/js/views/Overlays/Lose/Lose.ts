import Button from '../../../blocks/button';
import BaseOverlay from '../../../modules/BaseOverlay';
import eventBus from '../../../modules/eventBus';
import router from '../../../modules/router';
import ViewService from '../../../services/ViewService';
import './Lose.scss';

const InfoOverlayTmpl = (require('./Lose.pug') as TemplateRenderFunc);

export default class Lose extends BaseOverlay {

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

  public async start(data?: any): Promise<void> {
    // return undefined;
    this.RenderOverlay(InfoOverlayTmpl);

    this.backButton = new Button(document
      .querySelector('.main-block__frame__footer__back-section') as HTMLElement);
    this.backButton.onClick(() => eventBus.emit('game', 'quit'));
    this.backButton.onClick(() => data.offline ?
      router.go(ViewService.ViewPaths.offline.lobbyPage) :
      router.go(ViewService.ViewPaths.online.lobbyPage));
  }

  public async stop(): Promise<void> {
    // return undefined;
  }

  private backButton: Button;
  private logoutButton: Button;
}
