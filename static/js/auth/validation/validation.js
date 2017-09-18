import {validationStatus} from "../errors/validationErrors";

/**
 * Validates signup form for lexical validity
 * @param username username to check
 * @param email email to check
 * @param password password to check
 * @param confirmation checks password for equality
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
 * @param username username to check
 * @param password password to check
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
 * @param email email для проверки
 * @returns {number} Код ошибки или undefined
 */
const validateEmail = (email) => {
    if (email.length === 0) {
        return validationStatus.EMAIL_FIELD_EMPTY;
    }

    let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(email)) {
        return validationStatus.EMAIL_FIELD_BAD;
    }

    return validationStatus.SUCCESS;
};

/**
 * Проверяет username на лексическую валидность
 * @param username username  для проверки
 * @returns {number} Код ошибки или undefined
 */
const validateUsername = (username) => {
    if (username.length < 3) {
        return validationStatus.USERNAME_FIELD_TOO_SHORT;
    }

    let usernameRegExp = /^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/;
    if (!usernameRegExp.test(username)) {
        return validationStatus.USERNAME_FIELD_BAD;
    }

    return validationStatus.SUCCESS;
};

/**
 * Проверяет пароли на лексическую валидность и совпадение
 * @param password пароль для проверки
 * @param confirmation подтверждение пароля для проверки
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

const validatePassword = (password) => {
    if (password.length === 0) {
        return validationStatus.PASSWORD_FIELD_EMPTY;
    }

    if (password.length < 8) {
        return validationStatus.PASSWORD_FIELD_BAD;
    }

    return validationStatus.SUCCESS;
};


