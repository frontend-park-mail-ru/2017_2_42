import BaseOverlay from '../../../modules/BaseOverlay';
import './Settings.scss';

const InfoOverlayTmpl = (require('./Settings.pug') as TemplateRenderFunc);

export default class Settings extends BaseOverlay {

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

  public async start(data?: any): Promise<void> {
    // return undefined;
      this.RenderOverlay(InfoOverlayTmpl);
  }

  public async stop(): Promise<void> {
    // return undefined;
  }

}
