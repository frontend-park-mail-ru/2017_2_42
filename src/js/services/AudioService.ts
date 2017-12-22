///<reference path="../../../node_modules/@types/webaudioapi/index.d.ts"/>

import SoundFile from '../models/SoundFile';
import Utils from '../modules/utils/utils';
import SoundConfigurator from '../sounds/SoundConfigurator';


class AudioService {
  constructor() {
    this.RealAudioContext = window.AudioContext || (<any>window).webkitAudioContext || false;

    if (this.RealAudioContext) {
      this.BackgroundAudioCtx = new this.RealAudioContext();
      this.GameAudioCtx = new this.RealAudioContext();

      this.BgAudioConfigurator = new SoundConfigurator(this.BackgroundAudioCtx);
      this.GameAudioConfigurator = new SoundConfigurator(this.GameAudioCtx);

      this.playSound(this.Scopes.background, this.BackgroundAudios._1);
    } else {
      Utils.debugWarn('Web audio api is not supported');
    }
  }

  public muteSounds() {
    if (this.RealAudioContext) {
      this.GameAudioConfigurator.muteSound();
      this.BgAudioConfigurator.muteSound();
    }
  }

  public unmuteSounds() {
    if (this.RealAudioContext) {
      this.GameAudioConfigurator.unmuteSound();
      this.BgAudioConfigurator.unmuteSound();
    }
  }

  public isMuted() {
    if (this.RealAudioContext) {
      return this.GameAudioConfigurator.isMuted() || this.BgAudioConfigurator.isMuted();
    }
  }

  public async playSound(scope: string, soundFile: SoundFile) {
    if (this.RealAudioContext) {
      let curCtx: AudioContext;
      let curCtxCtrl: SoundConfigurator;

      switch (scope) {
        case this.Scopes.game:
          curCtx = this.GameAudioCtx;
          curCtxCtrl = this.GameAudioConfigurator;
          break;

        case this.Scopes.background:
          curCtx = this.BackgroundAudioCtx;
          curCtxCtrl = this.BgAudioConfigurator;
          break;

        default:
          throw 1; // TODO some exception
      }

      const buffsource = curCtx.createBufferSource();

      soundFile.GetBuffer()
        .then((abuff) => {
          return curCtx.decodeAudioData(abuff);
        })
        .then((buff) => {
          buffsource.buffer = buff;
          buffsource.connect(curCtxCtrl.getNode());
          buffsource.start(0);
        });
    }
  }

  private RealAudioContext: any;

  private BackgroundAudioCtx: AudioContext;
  private BgAudioConfigurator: SoundConfigurator;

  private GameAudioCtx: AudioContext;
  private GameAudioConfigurator: SoundConfigurator;

  public Scopes = {
    game: 'GameScope',
    background: 'BgScope',
  };

  private BackgroundAudios = {
    _1: new SoundFile('bg1'),
    // _2: new SoundFile(),
  };
}

export default new AudioService();