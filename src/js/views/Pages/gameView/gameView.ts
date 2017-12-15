///<reference path="../../../typings/fabric/index.d.ts"/>
import Button from '../../../blocks/button';

import {StartMessage} from '../../../game/gameLogic/Message';
import {GameOnline} from '../../../game/gameLogic/gameOnline';

import BaseView from '../../../modules/BaseView';

interface Size {
  height: number;
  width: number;
}

const GameViewTmpl = require('./gameView.pug') as TemplateRenderFunc;
import ViewService from '../../../services/ViewService';
import './gameView.scss';

export default class GameView extends BaseView {
  private readyButton: Button;
  private backButton: Button;
  private settingsButton: Button;
  private game: GameOnline;

  constructor(parentElement: HTMLElement) {
    super(parentElement, 'Game #');
  }

  public async start(mapMeta: Map.Meta): Promise<void> {
    this.RenderPage(GameViewTmpl);

    this.game = new GameOnline(mapMeta);
    this.game.load(this.initCanvas());

    this.initButtons();

    document.ontouchend = (event) => {
    };
  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = GameViewTmpl();
  }

  public async resume(mapMeta: Map.Meta): Promise<void> {
    this.start(mapMeta);
  }

  public async pause(): Promise<void> {
    this.destroy();
  }

  private mapMeta: Map.Meta;

  private chooseCanvasSize(canvas: HTMLCanvasElement): Size {
    const x = canvas.offsetWidth;
    const y = canvas.offsetHeight;

    const new_x = y * 16 / 9;
    if (x > new_x) {
      return {height: y, width: new_x};
    } else {
      return {height: x * 9 / 16, width: x};
    }
  }

  private initCanvas(): HTMLCanvasElement {
    const canvas = document.querySelector('.main-frame__game-canvas') as HTMLCanvasElement;
    const canvasSize = this.chooseCanvasSize(canvas);
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    return canvas;
  }

  private initButtons() {
    this.backButton = new Button(document
      .querySelector('.main-frame__header__back-button') as HTMLElement);
    this.backButton.onClick(() => this.router.go(ViewService.ViewPaths.online.lobbyPage));

    this.settingsButton = new Button(document.querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(() => this.router.showOverlay(ViewService.OverlayNames.application.settings));

    this.readyButton = new Button(document.querySelector('.main-frame__header__ready-button__not-ready') as HTMLElement);
    this.readyButton.onClick(() => {
      let startMsg = new StartMessage(this.game);
      startMsg.HandleRequest();
    });
  }
}
