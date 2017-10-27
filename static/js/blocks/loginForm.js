import Form from './form';
import Input from './input';
import Button from './button';

const usernamePos = 0;
const passwordPos = 1;

/**
 *
 *
 * @export
 * @class LoginForm
 * @extends {Form}
 */
export default class LoginForm extends Form {
  /**
   * Creates an instance of LoginForm.
   * @param {any} elem
   * @memberof LoginForm
   */
  constructor(elem) {
    super(elem);

    const fields = this.element.getElementsByClassName('container');

    this.usernameField = new Input(fields[usernamePos]);
    this.passwordField = new Input(fields[passwordPos]);

    this.submitButton = new Button(
      document.getElementById('login__login-button'));
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof LoginForm
   */
  validate() {
    return new Promise((resolve, reject) => {
      let errCodes = [
        this._validateUsername(),
        this._validatePassword(),
      ];

      errCodes = errCodes.filter((err) => err !== null);

      if (errCodes.length === 0) {
        resolve(this.getData());
        return;
      }
      reject(errCodes);
    });
  }

  /**
   *
   *
   * @memberof LoginForm
   */
  clearListeners() {
    super.clearListeners();
    this.usernameField.clearListeners();
    this.passwordField.clearListeners();
    this.submitButton.clearListeners();
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof LoginForm
   */
  getData() {
    return {
      login: this.usernameField.getValue(),
      password: this.passwordField.getValue(),
    };
  }
}
