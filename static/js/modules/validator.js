import {errors} from "../tools/errors/errors";

/**
 * Class Validator that validates data
 */
export class Validator {
  /**
   * Validates signup form for lexical validity
   * @param {Object} signUpForm form with signUp Data
   * @return {Promise} resolved or rejected with codes array
   */
  static validateSignUpForm(signUpForm) {
    return new Promise((resolve, reject) => {
      let errCodes = [];

      let usernameStatus = this._validateUsername(signUpForm.username);
      let emailStatus = this._validateEmail(signUpForm.email);
      let passwordsStatus = this._validatePassAndConf(
        signUpForm.password, signUpForm.confirmation);

      if (usernameStatus !== errors.SUCCESS) {
        errCodes.push(usernameStatus);
      }

      if (passwordsStatus !== errors.SUCCESS) {
        errCodes.push(passwordsStatus);
      }

      if (emailStatus !== errors.SUCCESS) {
        errCodes.push(emailStatus);
      }

      if (errCodes.length === 0) {
        resolve();
        return;
      }

      reject(errCodes);
    });
  };

  /**
   * Validates login form
   * @param {Object} loginForm form with login data
   * @return {Promise} resolved or rejected with codes array
   */
  static validateLoginForm(loginForm) {
    return new Promise((resolve, reject) => {
      let errCodes = [];

      let usernameStatus = this._validateUsername(loginForm.username);
      let passwordsStatus = this._validatePassword(loginForm.password);

      if (usernameStatus !== errors.SUCCESS) {
        errCodes.push(usernameStatus);
      }

      if (passwordsStatus !== errors.SUCCESS) {
        errCodes.push(passwordsStatus);
      }

      if (errCodes.length === 0) {
        resolve();
        return;
      }

      reject(errCodes);
    });

  };

  /**
   * Validates password on lexical errors
   * @param {string} password
   * @return {string} error code
   * @private
   */
  static _validatePassword(password) {
    if (password.length === 0) {
      return errors.PASSWORD_FIELD_EMPTY;
    }

    if (password.length < 8) {
      return errors.PASSWORD_FIELD_BAD;
    }

    return errors.SUCCESS;
  };

  /**
   * Проверяет пароли на лексическую валидность и совпадение
   * @param {string} password пароль для проверки
   * @param {string} confirmation подтверждение пароля для проверки
   * @return {string} Код ошибки или undefined
   * @private
   */
  static _validatePassAndConf(password, confirmation) {
    let passwordStatus = this._validatePassword(password);

    if (passwordStatus !== errors.SUCCESS) {
      return passwordStatus;
    }

    if (password !== confirmation) {
      return errors.CONFIRMATION_FIELD_BAD;
    }

    return errors.SUCCESS;
  };

  /**
   * Проверяет username на лексическую валидность
   * @param {string} username username для проверки
   * @return {string} Код ошибки или undefined
   * @private
   */
  static _validateUsername(username) {
    if (username.length < 3) {
      return errors.USERNAME_FIELD_TOO_SHORT;
    }

    let usernameRegExp = /^[A-Za-z][A-Za-z0-9]*?([-_][A-Za-z0-9]+){0,2}$/;
    if (!usernameRegExp.test(username)) {
      return errors.USERNAME_FIELD_BAD;
    }

    return errors.SUCCESS;
  };

  /**
   * Проверяет email на лексическую валидность
   * @param {string} email email для проверки
   * @return {string} Код ошибки или undefined
   * @private
   */
  static _validateEmail(email) {
    if (email.length === 0) {
      return errors.EMAIL_FIELD_EMPTY;
    }

    let emailRegExp = /.+@.+\..+/i;
    emailRegExp.test();

    if (!emailRegExp.test(email)) {
      return errors.EMAIL_FIELD_BAD;
    }

    return errors.SUCCESS;
  };

}