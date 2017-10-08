import Block from './block';

export default class Form extends Block {
  /**
   *
   * @param {Function} callback
   */
  onSubmit(callback) {
    return this.on('submit', callback);
  }

  /**
   * Validates password on lexical errors
   * @return {string | null} error code
   * @private
   */
  _validatePassword() {
    const password = this.passwordField.getValue();

    if (password.length === 0) {
      return errors.PASSWORD_FIELD_EMPTY;
    }

    if (password.length < 6) {
      return errors.PASSWORD_FIELD_BAD;
    }
    return null;
  }

  /**
   * Проверяет пароли на лексическую валидность и совпадение
   * @return {string | null} Код ошибки или undefined
   * @private
   */
  _validatePassAndConf() {
    const passwordStatus = this._validatePassword();

    if (passwordStatus !== errors.SUCCESS) {
      return passwordStatus;
    }

    const password = this.passwordField.getValue();
    const confirmation = this.confirmationField.getValue();

    if (password !== confirmation) {
      return errors.CONFIRMATION_FIELD_BAD;
    }

    return null;
  };

  /**
   * Проверяет username на лексическую валидность
   * @return {string | null} Код ошибки или undefined
   * @private
   */
  _validateUsername() {
    const username = this.usernameField.getValue();

    if (username.length < 3) {
      return errors.USERNAME_FIELD_TOO_SHORT;
    }

    const usernameRegExp = /^[A-Za-z][A-Za-z0-9]*?([-_][A-Za-z0-9]+){0,2}$/;
    if (!usernameRegExp.test(username)) {
      return errors.USERNAME_FIELD_BAD;
    }

    return null;
  };

  /**
   * Проверяет email на лексическую валидность
   * @return {string | null} Код ошибки или undefined
   * @private
   */
  _validateEmail() {
    const email = this.emailField.getValue();

    if (email.length === 0) {
      return errors.EMAIL_FIELD_EMPTY;
    }

    let emailRegExp = /.+@.+\..+/i;
    emailRegExp.test();

    if (!emailRegExp.test(email)) {
      return errors.EMAIL_FIELD_BAD;
    }

    return null;
  };

  /**
   * Method that handles errors in errorsArr
   * @param {Array} errorsArr array with an errors
   */
  _handle(errorsArr) {
    errorsArr.forEach(error => {
      switch (error) {
        case errors.USERNAME_FIELD_EMPTY:
          this.usernameField.setError('enter username');
          break;

        case errors.USERNAME_FIELD_BAD:
          this.usernameField.setError('username isn\'t correct');
          break;

        case errors.USERNAME_FIELD_TOO_SHORT:
          this.usernameField.setError('username must be at ' +
            'least 3 characters');
          break;

        case errors.USERNAME_ALREADY_EXISTS:
          this.usernameField.setError('username already exists');
          break;

        case errors.USERNAME_NOT_EXISTS:
          this.usernameField.setError('username doesn\'t exist');
          break;

        case errors.EMAIL_FIELD_EMPTY:
          this.emailField.setError('enter email');
          break;

        case errors.EMAIL_FIELD_BAD:
          this.emailField.setError('enter a correct email');
          break;

        case errors.EMAIL_ALREADY_EXISTS:
          this.emailField.setError('user with this email' +
            ' already exists');
          break;

        case errors.PASSWORD_FIELD_EMPTY:
          this.passwordField.setError('enter password');
          break;

        case errors.PASSWORD_FIELD_BAD:
          this.passwordField.setError('password must be at least ' +
            '6 characters');
          break;

        case errors.PASSWORD_WRONG:
          this.passwordField.setError('wrong password');
          break;

        case errors.CONFIRMATION_FIELD_BAD:
          this.confirmationField.setError('password doesn\'t match');
          break;
      }
    });
  }
}

const errors = {
  SUCCESS: 'SUCCESS',

  USERNAME_FIELD_EMPTY: 'USERNAME_FIELD_EMPTY',
  USERNAME_FIELD_BAD: 'USERNAME_FIELD_BAD',
  USERNAME_FIELD_TOO_SHORT: 'USERNAME_FIELD_TOO_SHORT',

  EMAIL_FIELD_EMPTY: 'EMAIL_FIELD_EMPTY',
  EMAIL_FIELD_BAD: 'EMAIL_FIELD_BAD',

  PASSWORD_FIELD_EMPTY: 'PASSWORD_FIELD_EMPTY',
  PASSWORD_FIELD_BAD: 'PASSWORD_FIELD_BAD',

  CONFIRMATION_FIELD_BAD: 'CONFIRMATION_FIELD_BAD',

  /**
   * SignUp errors
   */
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',

  /**
   * Login errors
   */
  USERNAME_NOT_EXISTS: 'USERNAME_NOT_EXISTS',
  PASSWORD_WRONG: 'PASSWORD_WRONG',

  /**
   * Server unavailable
   */
  SERVER_UNAVAILABLE: 'SERVER_UNAVAILABLE',
};
