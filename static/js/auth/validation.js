export const flags = {
    1000: 'Введите email',
    1001: 'Введите ваш реальный email',
    1100: 'Логин должен содержать минимум 3 символа',
    1101: 'Логин должен начинаться с латинской буквы и содержать в себе не более двух символов "_" или "-"',
    1200: 'Пароль должен быть не короче 8 символов',
    1201: 'Пароли не совпадают',
};

/**
 * Проверяет email на лексическую валидность
 * @param email email для проверки
 * @returns {number} Код ошибки или undefined
 */
export const validateEmail = (email) => {
    if (email.length === 0) {
        return 1000;
    }

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        return 1001;
    }
};

/**
 * Проверяет username на лексическую валидность
 * @param username username  для проверки
 * @returns {number} Код ошибки или undefined
 */
export const validateUsername = (username) => {
    if (username.length < 3) {
        return 1100;
    }

    let re = /^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/;
    if (!re.test(username)) {
        return 1101;
    }
};

/**
 * Проверяет пароли на лексическую валидность и совпадение
 * @param password пароль для проверки
 * @param confirmation подтверждение пароля для проверки
 * @return {number} Код ошибки или undefined
 */
export const validatePassword = (password, confirmation) => {
    if (password.length < 8){
        return 1200;
    }

    if (password !== confirmation){
        return 1201;
    }
};
