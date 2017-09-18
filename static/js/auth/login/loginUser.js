import {validateLoginForm} from "../validation/validation";
import {loginForm, passwordField, usernameField} from "./loginUtils";
import {validationErrorHandler} from "../validation/validationHandler";

const loginListenerCallback = (event) => {
    event.preventDefault();

    const username = usernameField.value;
    const password = passwordField.value;

    const errorCodes = validateLoginForm(username, password);

    if (errorCodes.length === 0) {
        loginUser(username, password);
    } else {
        validationErrorHandler(errorCodes, usernameField, passwordField);
    }
};

const loginUser = (username, password) => {
    console.log("YEAH");
    //todo
};

export const addLoginEventListener = () => {
    loginForm.addEventListener('submit', loginListenerCallback);
};

export const removeLoginEventListener = () => {
    loginForm.removeEventListener('submit', loginListenerCallback);
};