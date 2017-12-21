import BaseOverlay from '../../../modules/BaseOverlay';
import './LeaderBoard.scss';

const InfoOverlayTmpl = (require('./LeaderBoard.pug') as TemplateRenderFunc);


export default class Info extends BaseOverlay {

    constructor(rootElement: HTMLElement) {
        super(rootElement);
    }

    public async start(data?: any): Promise<void> {
        this.RenderOverlay(InfoOverlayTmpl);
    }

    public async stop(): Promise<void> {
    }

}