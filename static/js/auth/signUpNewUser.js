import {validateEmail, validatePassword, validateUsername, validationStatus,} from "./validation"
import {json_request, METHOD_POST} from "../tools/json_request";

const SIGNUP_PATH = '/auth/signup';

let signUpForm = document.getElementById("signup");

export const usernameField = signUpForm.elements['username'];
export const emailField = signUpForm.elements['email'];
export const passwordField = signUpForm.elements['password'];
export const confirmationField = signUpForm.elements['confirm-password'];

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = usernameField.value;
    let email = emailField.value;
    let password = passwordField.value;
    let confirmation = confirmationField.value;

    let errCode = validateUsername(username) || validateEmail(email) || validatePassword(password, confirmation);

    if (errCode === validationStatus.SUCCESS) {
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
        case validationStatus.USERNAME_FIELD_EMPTY:
            // todo
            usernameField.style.borderColor = 'red';
            break;

        case validationStatus.USERNAME_FIELD_BAD:
            // todo
            break;

        case validationStatus.PASSWORD_FIELD_EMPTY:
            // todo
            break;

        case validationStatus.PASSWORD_FIELD_BAD:
            // todo
            break;

        case validationStatus.EMAIL_FIELD_BAD:
            // todo
            break;

        case validationStatus.EMAIL_FIELD_EMPTY:
            // todo
            break;
        case validationStatus.CONFIRMATION_FIELD_BAD:
            // todo
            break;
    }
};

const signUpNewUser = (username, email, password) => {
    const signupForm = {username, email, password};
    alert("jddjdj");
    debugger;

    json_request(METHOD_POST, SIGNUP_PATH, signupForm, (respStatus, respBody) => {
        switch (respStatus) {
            case 200:
                signUpForm.style.display = "none";
                break;
            case 400: {
                alert('Wrong data');
                break;
            }
            case 409:
                alert('User exists');
                break;
            default:
                alert('Server error');
                break;
        }
    })
};

