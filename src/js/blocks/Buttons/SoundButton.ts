import Button from '../button';

export default class SoundButton extends Button {
  constructor(element: HTMLElement) {
    super(element);
    this.muted = false;

    this.element.addEventListener('click', () => {
      if (this.muted) {
        this.element.classList.remove('main_frame__header__sound-button-muted');
        this.element.classList.add('main_frame__header__sound-button');
        this.muted = false;
      } else {
        this.element.classList.remove('main_frame__header__sound-button');
        this.element.classList.add('main_frame__header__sound-button-muted');
        this.muted = true;
      }
    });
  }

  private muted: boolean;
}