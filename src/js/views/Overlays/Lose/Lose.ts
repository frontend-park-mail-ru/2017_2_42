import BaseOverlay from '../../../modules/BaseOverlay';

export default class Lose extends BaseOverlay {

  constructor(rootElement: HTMLElement) {
    super(rootElement);
  }

  start(data?: any): Promise<void> {
    return undefined;
  }

  stop(): Promise<void> {
    return undefined;
  }
}