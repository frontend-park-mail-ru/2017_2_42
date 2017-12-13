import BaseOverlay from '../../../modules/BaseOverlay';
import './Info.scss';

const InfoOverlayTmpl = (require('./Info.pug') as TemplateRenderFunc);


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