import Button from '../button';

export default class LockableButton extends Button {
  constructor(element: HTMLElement) {
    super(element);
    this.defaultValue = (this.element as HTMLInputElement).value;
  }

  public lock() {
    (this.element as HTMLInputElement).value = 'WAIT';
  }

  public unlock() {
    (this.element as HTMLInputElement).value = this.defaultValue;
  }

  private defaultValue: string;
}