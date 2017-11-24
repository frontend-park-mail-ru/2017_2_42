import userService from '../../services/userService';
import ViewPaths from '../pagePaths';
import './startView.scss';

import User from 'src/js/models/user';
import Button from '../../blocks/button';
import BaseView from '../../modules/baseView';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';

const StartPageTmpl = (require('./startView.pug') as TemplateRenderFunc);
export default class StartView extends BaseView {
  constructor(parentElement: HTMLElement) {
    super(parentElement);

    this.name = 'Physics.io';
    this.renderFunc = StartPageTmpl;
  }

  start(): void {
    document.body.querySelector('#main-frame').innerHTML = this.renderFunc();

    this.playButton = new Button(document.querySelector('.main_frame__content__play_button') as HTMLElement);
    this.settingsButton = new Button(document.querySelector('.main_frame__header__settings_button') as HTMLElement);
    this.aboutButton = new Button(document.querySelector('.main_frame__footer__about_button') as HTMLElement);
    this.muteButton = new Button(document.querySelector('.main_frame__header__sound_button') as HTMLElement);

    userService.getUser(true)
      .then((user: User | null) => {
        if (user) {
          this.playButton.onClick(() => {
            this.router.go(ViewPaths.online_lobby);
          });
        } else {
          this.playButton.onClick(() => {
            this.router.go(ViewPaths.login);
          });
        }
      })
      .catch((err) => {
        this.playButton.onClick(() => {
          this.router.go(ViewPaths.offline_lobby);
        });
      });

    this.aboutButton.onClick(() => {
      this.router.go(ViewPaths.about);
    });

    this.muteButton.onClick(() => {
      console.log('sound muted');
    });

    this.settingsButton.onClick(() => {
      console.log('settings overlay');
    });
  }

  destroy(): void {
    document.querySelector('#main-frame').innerHTML = '';
    this.aboutButton = undefined;
    this.muteButton = undefined;
    this.settingsButton = undefined;
    this.playButton = undefined;
  }

  pause(): void {
    this.destroy();
  }

  resume(): void {
    this.start();
  }

  private playButton: Button;
  private aboutButton: Button;
  private settingsButton: Button;
  private muteButton: Button;
}
