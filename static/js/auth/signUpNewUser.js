import {validateEmail, validatePassword, validateUsername, validationStatus,} from "./validation"
import {json_request, METHOD_POST} from "../tools/json_request";

const PATHS = {
    SIGNUP_PATH: '/auth/signup',
    LOGIN_PATH: '/auth/login'
};

const signUpForm = document.getElementById("signup").getElementsByTagName('form')[0];


export const usernameField = signUpForm.elements['username'];
export const emailField = signUpForm.elements['email'];
export const passwordField = signUpForm.elements['password'];
export const confirmationField = signUpForm.elements['confirm-password'];

const singleTimeEventListener = (field, fieldEvent) => {
    if (typeof fieldEvent === "string") {
        field.addEventListener(fieldEvent, function evCallback(event) {
            setOKInputState(event.currentTarget);
            event.currentTarget.removeEventListener(fieldEvent, evCallback);
        });
    }
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
    } else {
        handleError(errCodesArr);
    }
});

const setOKInputState = (inputField) => {
    let messageField = inputField.nextElementSibling;
    messageField.style.display = "none";
    inputField.classList.remove("input-error");
    inputField.classList.add("input-ok");
};


const setErrorInputState = (inputField, message) => {
    let messageField = inputField.nextElementSibling;
    messageField.style.display = "block";
    messageField.textContent = message;
    inputField.classList.remove("input-ok");
    inputField.classList.add("input-error");
};

/**
 * Обработчик ошибок возникших при валидации формы регистрации
 * @param errCodesArr коды ошибок
 */
const handleError = (errCodesArr) => {
    for (let errCode of errCodesArr) {
        switch (errCode) {
            case validationStatus.USERNAME_FIELD_BAD:
                setErrorInputState(usernameField, "username isn't correct");
                singleTimeEventListener(usernameField, 'click');
                break;
            case validationStatus.USERNAME_FIELD_TOO_SHORT:
                setErrorInputState(usernameField, "username must be at least 3 characters");
                singleTimeEventListener(usernameField, 'click');
                break;
            case validationStatus.PASSWORD_FIELD_EMPTY:
                setErrorInputState(passwordField, "enter password");
                singleTimeEventListener(passwordField, 'click');
                break;
            case validationStatus.PASSWORD_FIELD_BAD:
                setErrorInputState(passwordField, "password must be at least 8 characters");
                singleTimeEventListener(passwordField, 'click');
                break;
            case validationStatus.EMAIL_FIELD_BAD:
                setErrorInputState(emailField, "enter a correct email");
                singleTimeEventListener(emailField, 'click');
                break;
            case validationStatus.EMAIL_FIELD_EMPTY:
                setErrorInputState(emailField, "enter email");
                singleTimeEventListener(emailField, 'click');
                break;
            case validationStatus.CONFIRMATION_FIELD_BAD:
                setErrorInputState(confirmationField, "passwords don't match");
                singleTimeEventListener(confirmationField, 'click');
                break;
        }
    }
};

const signUpNewUser = (username, email, password) => {
    const signupForm = {username, email, password};

    json_request(METHOD_POST, PATHS.SIGNUP_PATH, signupForm, (xhr) => {
        switch (xhr.statusCode) {
            case 200:
                signUpForm.style.display = "none";
                break;
            case 400: {
                alert('Wrong data');
                break;
            }
            case 409:
                let error = xhr.body.error;
                if (error === "EMAIL_ALREADY_EXISTS") {
                    setErrorInputState(emailField, "email already exists");
                    singleTimeEventListener(emailField, 'click');
                } else if (error === "USERNAME_ALREADY_EXISTS") {
                    setErrorInputState(usernameField, "username already exists");
                    singleTimeEventListener(usernameField, 'click');
                }
                break;
            case 500:
                alert('Server error');
                break;
        }
    })
};

