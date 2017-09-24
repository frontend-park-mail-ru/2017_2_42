import {validationStatus} from '../errors/validationErrors';

/**
 * Validates signup form for lexical validity
 * @param {string} username username to check
 * @param {string} email email to check
 * @param {string} password password to check
 * @param {string} confirmation checks password for equality
 * @return {Array} error codes array
 */
export const validateSignupForm = (username, email, password, confirmation) => {
  let errCodes = [];

  let usernameStatus = validateUsername(username);
  let emailStatus = validateEmail(email);
  let passwordsStatus = validatePassAndConf(password, confirmation);

  if (usernameStatus !== validationStatus.SUCCESS) {
    errCodes.push(usernameStatus);
  }

  if (passwordsStatus !== validationStatus.SUCCESS) {
    errCodes.push(passwordsStatus);
  }

  if (emailStatus !== validationStatus.SUCCESS) {
    errCodes.push(emailStatus);
  }

  return errCodes;
};


/**
 * Validates login form for lexical validity
 * @param {string} username username to check
 * @param {string} password password to check
 * @return {Array} error codes array
 */
export const validateLoginForm = (username, password) => {
  let errCodes = [];

  let usernameStatus = validateUsername(username);
  let passwordsStatus = validatePassword(password);

  if (usernameStatus !== validationStatus.SUCCESS) {
    errCodes.push(usernameStatus);
  }

  if (passwordsStatus !== validationStatus.SUCCESS) {
    errCodes.push(passwordsStatus);
  }

  return errCodes;
};


/**
 * Проверяет email на лексическую валидность
 * @param {string} email email для проверки
 * @return {number} Код ошибки или undefined
 */
const validateEmail = (email) => {
  if (email.length === 0) {
    return validationStatus.EMAIL_FIELD_EMPTY;
  }

  let emailRegExp = new RegExp(['/^(([^<>()\[\]\\.,;:\s@\']+(\.[^',
    '<>()\[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]',
    '{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'].join(''));

  if (!emailRegExp.test(email)) {
    return validationStatus.EMAIL_FIELD_BAD;
  }

  return validationStatus.SUCCESS;
};

/**
 * Проверяет username на лексическую валидность
 * @param {string} username username для проверки
 * @return {number} Код ошибки или undefined
 */
const validateUsername = (username) => {
  if (username.length < 3) {
    return validationStatus.USERNAME_FIELD_TOO_SHORT;
  }

  let usernameRegExp = /^[A-Za-z][A-Za-z0-9]*?([-_][A-Za-z0-9]+){0,2}$/;
  if (!usernameRegExp.test(username)) {
    return validationStatus.USERNAME_FIELD_BAD;
  }

  return validationStatus.SUCCESS;
};

/**
 * Проверяет пароли на лексическую валидность и совпадение
 * @param {string} password пароль для проверки
 * @param {string} confirmation подтверждение пароля для проверки
 * @return {number} Код ошибки или undefined
 */
const validatePassAndConf = (password, confirmation) => {
  let passwordStatus = validatePassword(password);

  if (passwordStatus !== validationStatus.SUCCESS) {
    return passwordStatus;
  }

  if (password !== confirmation) {
    return validationStatus.CONFIRMATION_FIELD_BAD;
  }

  return validationStatus.SUCCESS;
};


/**
 * Validates password on lexical errors
 * @param {string} password
 * @return {number} error code
 */
const validatePassword = (password) => {
  if (password.length === 0) {
    return validationStatus.PASSWORD_FIELD_EMPTY;
  }

  if (password.length < 8) {
    return validationStatus.PASSWORD_FIELD_BAD;
  }

  return validationStatus.SUCCESS;
};


