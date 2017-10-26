import {EventsEnum, ScopesEnum} from '../../modules/eventBus';
import Button from '../../blocks/button';
import BaseView from '../../modules/baseView';

const StartPageTmpl = (require('./startView.pug') as TemplateRenderFunc);
export default class StartView extends BaseView {
  startOnlineBtn: Button;
  startOfflineBtn: Button;

  constructor(parentElement: HTMLElement) {
    super(parentElement);

    this.name = 'Physics.io';
    this.renderFunc = StartPageTmpl;

    this.pageSection.id = 'start-game';
  }

  start(): void {
    this.pageSection.innerHTML = this.renderFunc();
    this.rootElement.appendChild(this.pageSection);

    this.startOnlineBtn = new Button(
      (this.rootElement.querySelector('.play-online-btn') as HTMLElement));

    this.startOfflineBtn = new Button(
      (this.rootElement.querySelector('.play-offline-btn') as HTMLElement));

    this.startOnlineBtn.onClick((event: Event) => {
      event.preventDefault();
      this.pause();
      this.bus.emit(ScopesEnum.global, EventsEnum.run_online, {});
    });

    this.startOfflineBtn.onClick((event: Event) => {
      event.preventDefault();
      this.pause();
      this.bus.emit(ScopesEnum.global, EventsEnum.run_offline, {});
    });
  }

  destroy(): void {
    this.rootElement.removeChild(this.pageSection);
    this.pageSection = undefined;
    this.startOnlineBtn = undefined;
    this.startOfflineBtn = undefined;
  }

  pause(): void {
    this.hide();
  }

  resume(): void {
    this.show();
  }
}
