import '../../../../img/Ball.svg';
import BaseOverlay from '../../../modules/BaseOverlay';
import './WaitingTeammates.scss';

const WaitingTeammatesOverlay = (require('./WaitingTeammates.pug') as TemplateRenderFunc);

export default class WaitingTeammates extends BaseOverlay {
  start(data?: any): Promise<void> {
    this.RenderOverlay(WaitingTeammatesOverlay);
    return undefined;
  }

  stop(): Promise<void> {
    return undefined;
  }

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

}