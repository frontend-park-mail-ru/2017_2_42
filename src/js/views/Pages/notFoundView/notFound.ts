import BaseView from '../../../modules/BaseView';

export default class NotFoundView extends BaseView {
  constructor(rootElement: HTMLElement) {
    super(rootElement, 'Physics.io | offline lobby');
  }

  start(data?: any): Promise<void> {
    return undefined;
  }

  destroy(): Promise<void> {
    return undefined;
  }

  resume(data?: any): Promise<void> {
    return undefined;
  }

  pause(): Promise<void> {
    return undefined;
  }
}
