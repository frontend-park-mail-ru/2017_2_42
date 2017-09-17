import {validateSignupForm} from "../validation"
import {http} from "../../http/http";
import {PATHS} from "../../tools/paths";

import {
    confirmationField,
    emailField,
    passwordField,
    setOKInputState,
    signUpForm,
    signupResponseHandler,
    usernameField,
    validationErrorHandler
} from "./signupUtils";

const signUpNewUser = (username, email, password) => {
    const signupForm = {username, email, password};

    http.post(PATHS.SIGNUP_PATH, JSON.stringify(signupForm), (xhr, resp) => {
        if (resp.serverStatus !== 'OK') {
            alert('server error');
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
        validationErrorHandler(errCodesArr);
    }
};

export const addSignupSubmitListener = () => {
    console.log(1);
    signUpForm.addEventListener('submit', signupSubmitCallback);
};
addSignupSubmitListener();

export const removeSignupSubmitListener = () => {
    signUpForm.removeEventListener('submit', signupSubmitCallback);
};


