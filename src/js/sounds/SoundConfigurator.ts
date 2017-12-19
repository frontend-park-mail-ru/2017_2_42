const globalVariable = 'SoundConfig__';

const VolumeKey = `${globalVariable}volume`;
const MutedKey = `${globalVariable}muted`;

export default class SoundConfigurator {
  constructor(private AudioCtx: AudioContext) {
    this.GainNode = AudioCtx.createGain();
    this.GainNode.connect(AudioCtx.destination);
    this.volume = +localStorage.getItem(VolumeKey) || 0.7;
    this.muted = localStorage.getItem(MutedKey) === 'true';
    this.GainNode.gain.value = this.muted ? 0 : this.volume;
  }

  public getNode(): GainNode {
    return this.GainNode;
  }

  public muteSound() {
    localStorage.setItem(MutedKey, 'true');
    this.muted = true;
    this.GainNode.gain.value = 0;
  }

  public isMuted() {
    return this.muted;
  }

  public unmuteSound() {
    localStorage.setItem(MutedKey, 'false');
    this.muted = false;
    this.GainNode.gain.value = this.volume;
  }

  public setVolume(newVolume: number) {
    localStorage.setItem(VolumeKey, `${newVolume}`);
    this.muted = false;
    this.volume = newVolume;
    this.GainNode.gain.value = newVolume;
  }

  public getVolume() {
    return this.muted ? 0 : this.volume;
  }

  private GainNode: GainNode;
  private volume: number;
  private muted: boolean;
}
