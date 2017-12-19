import SoundFile from '../models/SoundFile';
import SoundConfigurator from '../sounds/SoundConfigurator';


class AudioService {
  constructor() {
    this.BackgroundAudioCtx = new AudioContext();
    this.GameAudioCtx = new AudioContext();

    this.BgAudioConfigurator = new SoundConfigurator(this.BackgroundAudioCtx);
    this.GameAudioConfigurator = new SoundConfigurator(this.GameAudioCtx);

    console.log(1);
    this.playSound(this.Scopes.background, this.BackgroundAudios._1);
  }

  public muteSounds() {
    this.GameAudioConfigurator.muteSound();
    this.BgAudioConfigurator.muteSound();
  }

  public unmuteSounds() {
    this.GameAudioConfigurator.unmuteSound();
    this.BgAudioConfigurator.unmuteSound();
  }

  public isMuted() {
    return this.GameAudioConfigurator.isMuted() || this.BgAudioConfigurator.isMuted();
  }

  public async playSound(scope: string, soundFile: SoundFile) {
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

  private BackgroundAudioCtx: AudioContext;
  private BgAudioConfigurator: SoundConfigurator;

  private GameAudioCtx: AudioContext = new AudioContext();
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