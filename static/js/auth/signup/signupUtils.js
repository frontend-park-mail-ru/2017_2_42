import {singleTimeEventListener} from "../../tools/eventUtils";
import {validationStatus} from "../validation";

export const signUpForm = document.getElementById("signup").getElementsByTagName('form')[0];

export const usernameField = signUpForm.elements['username'];
export const emailField = signUpForm.elements['email'];
export const passwordField = signUpForm.elements['password'];
export const confirmationField = signUpForm.elements['confirm-password'];


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
export const validationErrorHandler = (errCodesArr) => {

    for (let errCode of errCodesArr) {
        switch (errCode) {
            case validationStatus.USERNAME_FIELD_BAD:
                setErrorInputState(usernameField, "username isn't correct");
                singleTimeEventListener(usernameField, 'click', setOKInputState);
                break;
            case validationStatus.USERNAME_FIELD_TOO_SHORT:
                setErrorInputState(usernameField, "username must be at least 3 characters");
                singleTimeEventListener(usernameField, 'click', setOKInputState);
                break;
            case validationStatus.PASSWORD_FIELD_EMPTY:
                setErrorInputState(passwordField, "enter password");
                singleTimeEventListener(passwordField, 'click', setOKInputState);
                break;
            case validationStatus.PASSWORD_FIELD_BAD:
                setErrorInputState(passwordField, "password must be at least 8 characters");
                singleTimeEventListener(passwordField, 'click', setOKInputState);
                break;
            case validationStatus.EMAIL_FIELD_BAD:
                setErrorInputState(emailField, "enter a correct email");
                singleTimeEventListener(emailField, 'click', setOKInputState);
                break;
            case validationStatus.EMAIL_FIELD_EMPTY:
                setErrorInputState(emailField, "enter email");
                singleTimeEventListener(emailField, 'click', setOKInputState);
                break;
            case validationStatus.CONFIRMATION_FIELD_BAD:
                setErrorInputState(confirmationField, "passwords don't match");
                singleTimeEventListener(confirmationField, 'click', setOKInputState);
                break;
        }
    }
};

export const signupResponseHandler = (xhr, resp) => {
    if (resp.serverStatus !== "OK") {
        alert("SERVER DOWN");
        return;
    }

    switch (xhr.statusCode) {
        case 200:
            signUpForm.style.display = "none";
            break;
        case 400: {
            setErrorInputState(usernameField, "username bad");
            singleTimeEventListener(usernameField, 'click', setOKInputState);

            setErrorInputState(emailField, "email bad");
            singleTimeEventListener(emailField, 'click', setOKInputState);

            setErrorInputState(confirmationField, "passwords bad");
            singleTimeEventListener(confirmationField, 'click', setOKInputState);

            setErrorInputState(confirmationField, "passwords don't match");
            singleTimeEventListener(confirmationField, 'click', setOKInputState);
            break;
        }
        case 409:
            const error = resp.error;

            if (error === "EMAIL_ALREADY_EXISTS") {
                setErrorInputState(emailField, "email already exists");
                singleTimeEventListener(emailField, 'click', setOKInputState);
            } else if (error === "USERNAME_ALREADY_EXISTS") {
                setErrorInputState(usernameField, "username already exists");
                singleTimeEventListener(usernameField, 'click', setOKInputState);
            }
            break;
    }
};