import {validateSignupForm} from "../validation/validation"
import {http} from "../../http/http";
import {PATHS} from "../../tools/paths";
import {validationErrorHandler} from "../validation/validationHandler";

import {
    confirmationField,
    emailField,
    passwordField,
    signUpForm,
    signupResponseHandler,
    usernameField,
} from "./signupUtils";

const signUpNewUser = (username, email, password, confirmation) => {
    const signupForm = {username, email, password, confirmation};
    const reqBody = JSON.stringify(signupForm);

    http.post(PATHS.SIGNUP_PATH, reqBody, (xhr, resp) => {
        if (resp.serverStatus !== 'OK') {
            alert('server error');
            return;
        }
        signupResponseHandler(xhr, resp);
    })
};


const signupSubmitCallback = (event) => {
    event.preventDefault();

    let username = usernameField.value;
    let email = emailField.value;
    let password = passwordField.value;
    let confirmation = confirmationField.value;

    let errCodesArr = validateSignupForm(username, email, password, confirmation);

    if (errCodesArr.length === 0) {
        signUpNewUser(username, email, password, confirmation);
    } else {
        validationErrorHandler(errCodesArr, usernameField, passwordField, emailField, confirmationField);
    }
};

export const addSignupSubmitListener = () => {
    signUpForm.addEventListener('submit', signupSubmitCallback);
};

export const removeSignupSubmitListener = () => {
    signUpForm.removeEventListener('submit', signupSubmitCallback);
};


