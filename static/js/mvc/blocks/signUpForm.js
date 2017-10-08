import Form from './form';
import Input from './input';
import Button from './button';

const usernamePos = 0;
const emailPos = 1;
const passwordPos = 2;
const confirmationPos = 3;

export default class SignUpForm extends Form {
  constructor(elem) {
    super(elem);

    const fields = this.elem.getElementsByClassName('container');

    this.usernameField = new Input(fields[usernamePos]);
    this.emailField = new Input(fields[emailPos]);
    this.passwordField = new Input(fields[passwordPos]);
    this.confirmationField = new Input(fields[confirmationPos]);

    this.submitButton = new Button(
      document.getElementById('sign-up__sign-up-button'));
  }

  validate() {
    return new Promise((resolve, reject) => {
      let errCodes = [
        this._validateUsername(),
        this._validateEmail(),
        this._validatePassAndConf()
      ];

      errCodes = errCodes.filter(err => err !== null);
      console.log(errCodes);

      if (errCodes.length === 0) {
        resolve(this.getData());
        return;
      }

      reject(errCodes);
    });
  }

  getData() {
    return {
      username: this.usernameField.getValue(),
      password: this.passwordField.getValue(),
      email: this.emailField.getValue()
    }
  }

  clearListeners() {
    super.clearListeners();
    this.usernameField.clearListeners();
    this.passwordField.clearListeners();
    this.confirmationField.clearListeners();
    this.emailField.clearListeners();
    this.submitButton.clearListeners();
  }
}