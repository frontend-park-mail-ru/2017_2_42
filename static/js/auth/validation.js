export const validationStatus = {
    SUCCESS: 0,

    EMAIL_FIELD_EMPTY: 1000,
    EMAIL_FIELD_BAD: 1001,

    USERNAME_FIELD_EMPTY: 1100,
    USERNAME_FIELD_BAD: 1101,

    PASSWORD_FIELD_EMPTY: 1200,
    PASSWORD_FIELD_BAD: 1201,

    CONFIRMATION_FIELD_BAD: 1302
};



/**
 * Проверяет email на лексическую валидность
 * @param email email для проверки
 * @returns {number} Код ошибки или undefined
 */
export const validateEmail = (email) => {
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
export const validateUsername = (username) => {
    if (username.length < 3) {
        return validationStatus.USERNAME_FIELD_EMPTY;
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
export const validatePassword = (password, confirmation) => {
    if (password.length === 0) {
        return validationStatus.PASSWORD_FIELD_EMPTY;
    }

    if (password.length < 8) {
        return validationStatus.USERNAME_FIELD_BAD;
    }

    if (password !== confirmation) {
        return validationStatus.CONFIRMATION_FIELD_BAD;
    }

    return validationStatus.SUCCESS;
};
