import {validateEmail, validatePassword, validateUsername, validationStatus,} from "./validation"
import {json_request, METHOD_POST} from "../tools/json_request";

const PATHS = {
    SIGNUP_PATH: '/auth/signup',
    LOGIN_PATH: '/auth/signup'
};

let signUpForm = document.getElementById("signup").getElementsByTagName('form')[0];

export const usernameField = signUpForm.elements['username'];
export const emailField = signUpForm.elements['email'];
export const passwordField = signUpForm.elements['password'];
export const confirmationField = signUpForm.elements['confirm-password'];

const singleTimeEventListener = (field, fieldEvent, fieldCallback) => {
    if (typeof fieldEvent === "string" && typeof fieldCallback === "function") {
        field.addEventListener(fieldEvent, function evCallback(event) {
            fieldCallback(event);
            event.currentTarget.removeEventListener(fieldEvent, evCallback);
        });
    }
};

const wrong_input_event_callback = (event) => {
    alert(1);
};


signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = usernameField.value;
    let email = emailField.value;
    let password = passwordField.value;
    let confirmation = confirmationField.value;

    let statuses = [];

    statuses.push(validateUsername(username));
    statuses.push(validatePassword(password, confirmation));
    statuses.push(validateEmail(email));

    let errCodesArr = statuses.filter((status) => {
        return status !== validationStatus.SUCCESS
    });


    if (errCodesArr.length === 0) {
        signUpNewUser(username, email, password);
        signUpForm.reset();
    } else {
        handleError(errCodesArr);
    }
});

/**
 * Обработчик ошибок возникших при валидации формы регистрации
 * @param errCodesArr коды ошибок
 */
const handleError = (errCodesArr) => {
    for (let errCode of errCodesArr) {
        console.log(errCode === validationStatus.PASSWORD_FIELD_EMPTY);


        switch (errCode) {
            case validationStatus.USERNAME_FIELD_EMPTY:
                // todo
                usernameField.style.color = "rgba(255, 255, 0, 0.5)";
                singleTimeEventListener(usernameField, 'click', wrong_input_event_callback);
                break;

            case validationStatus.USERNAME_FIELD_BAD:
                // todo
                break;

            case validationStatus.PASSWORD_FIELD_EMPTY:
                // todo
                singleTimeEventListener(passwordField, 'click', wrong_input_event_callback);
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
    }
};

const signUpNewUser = (username, email, password) => {
    const signupForm = {username, email, password};
    debugger;

    json_request(METHOD_POST, PATHS.SIGNUP_PATH, signupForm, (respStatus, respBody) => {
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

