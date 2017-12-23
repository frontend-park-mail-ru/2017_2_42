import '../../../../img/Ball.svg';
import BaseOverlay from '../../../modules/BaseOverlay';
import eventBus from '../../../modules/eventBus';
import './WaitingTeammates.scss';
const WaitingTeammatesOverlay = (require('./WaitingTeammates.pug') as TemplateRenderFunc);

export default class WaitingTeammates extends BaseOverlay {
  start(data?: any): Promise<void> {
    this.RenderOverlay(WaitingTeammatesOverlay);
    (document.querySelector('#overlays') as HTMLElement).addEventListener('click', () => {
      eventBus.emit('game', 'quit');
    });
    return undefined;
  }

  stop(): Promise<void> {
    return undefined;
  }

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

}