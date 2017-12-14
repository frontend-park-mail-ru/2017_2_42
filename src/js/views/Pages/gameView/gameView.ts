///<reference path="../../../../../node_modules/@types/fabric/index.d.ts"/>
import Button from '../../../blocks/button';

import {StartMessage} from '../../../game/gameLogic/Message';
import {Game} from '../../../game/gameLogic/game';

import BaseView from '../../../modules/BaseView';

interface Size {
  height: number;
  width: number;
}

const GameViewTmpl = require('./gameView.pug') as TemplateRenderFunc;
import './gameView.scss';

export default class GameView extends BaseView {
  private readyButton: Button;
  private backButton: Button;
  private settingsButton: Button;

  constructor(parentElement: HTMLElement) {
    super(parentElement, 'Game #');
  }

  public async start(mapMeta: Map.Meta): Promise<void> {
    this.RenderPage(GameViewTmpl);

    const game = new Game({});

    const canvas = document.querySelector('.main-frame__game-canvas') as HTMLCanvasElement;
    const canvasSize = this.chooseCanvasSize(canvas);
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    await game.load(canvas, mapMeta.id);

    game.gameService.sendSocketMessage(`{"class": "SubscribeMessage", "board": ${mapMeta.id}}`);

    document.querySelector('.main-frame__header__ready-button__not-ready')
      .addEventListener('click', () => {
        let startMsg = new StartMessage(game);
        startMsg.HandleRequest();
      });

    document.ontouchend = (event) => {
      game.getState().onRun();
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

  // private game: Game;
  private mapMeta: Map.Meta;

  private chooseCanvasSize(canvas: HTMLCanvasElement): Size {
    const x = canvas.offsetWidth;
    const y = canvas.offsetHeight;

    const new_x = y * 4 / 3;
    if (x > new_x) {
      return {height: y, width: new_x};
    } else {
      return {height: x * 3 / 4, width: x};
    }
  }
}
