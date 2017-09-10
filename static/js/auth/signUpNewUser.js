import {flags, validateEmail, validatePassword, validateUsername,} from "./validation"

let signUpForm = document.getElementById("signup");

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = signUpForm.elements['username'].value;
    let email = signUpForm.elements['email'].value;
    let password = signUpForm.elements['password'].value;
    let confirmation = signUpForm.elements['confirmation'].value;

    let errCode = validateUsername(username) || validateEmail(email) || validatePassword(password, confirmation);

    if (errCode === undefined) {
        signUpNewUser(username, email, password);
        signUpForm.reset();
    } else {
        handleError(errCode);
    }
});

/**
 * Обработчик ошибок возникших при валидации формы регистрации
 * @param errCode код ошибки
 */
const handleError = (errCode) => {
    switch (errCode) {
        // 1000: 'Введите email',
        case 1000:
            // todo
            alert(flags[errCode]);
            break;

        // 1001: 'Введите ваш реальный email',
        case 1001:
            // todo
            alert(flags[errCode]);
            break;

        // 1100: 'Логин должен содержать минимум 3 символа',
        case 1100:
            // todo
            alert(flags[errCode]);
            break;

        // 1101: 'Логин должен начинаться с латинской буквы и содержать в себе не более двух символов "_" или "-"',
        case 1101:
            // todo
            alert(flags[errCode]);
            break;

        // 1200: 'Пароль должен быть не короче 8 символов',
        case 1200:
            // todo
            alert(flags[errCode]);
            break;

        // 1201: 'Пароли не совпадают',
        case 1201:
            // todo
            alert(flags[errCode]);
            break;
    }
};

const signUpNewUser = (username, email, password, callback) =>{
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', '/signup', true);

    const user = {username, email, password};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }

        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };

    xhr.send();
};