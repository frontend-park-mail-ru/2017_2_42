import PATHS from '../config/paths';

export default class SoundFile {
  constructor(name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const init = {
      method: 'GET',
      headers: headers,
      credentials: 'include',
      mode: 'same-origin',
    } as RequestInit;

    this.audioFile = fetch(`${window.location.origin}${PATHS.GET_SOUND}/${name}.mp3`, init);
  }

  public async GetBuffer(): Promise<ArrayBuffer> {
    const response = await this.audioFile;
    return response.arrayBuffer();
  }

  private audioFile: Promise<Response>;
  private audioBuffer: ArrayBuffer;
}