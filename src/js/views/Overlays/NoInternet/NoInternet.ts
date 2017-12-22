import BaseOverlay from '../../../modules/BaseOverlay';

export default class NoInternet extends BaseOverlay {
  start(data?: any): Promise<void> {
    return undefined;
  }

  stop(): Promise<void> {
    return undefined;
  }
  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }
}