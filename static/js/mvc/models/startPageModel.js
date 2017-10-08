import Button from '../blocks/button';
import eventBus from '../../modules/eventBus';

export default class StartGameModel {
  constructor() {
    this.page = document.getElementById('start-game');

    this.startOnlineBtn = new Button(
      document.getElementById('play-online-btn'));
    this.startOfflineBtn = new Button(
      document.getElementById('play-offline-btn'));
  }

  run() {
    this.startOnlineBtn
      .onClick(() => eventBus.emit('startOnline', null));
    this.startOfflineBtn
      .onClick(() => eventBus.emit('startOffline', null));
  }

  stop() {
    this.startOnlineBtn.clearListeners();
    this.startOfflineBtn.clearListeners();
  }
}
