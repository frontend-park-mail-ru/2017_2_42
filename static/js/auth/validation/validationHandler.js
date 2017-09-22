import {validationStatus} from "../errors/validationErrors";
import {singleTimeEventListener} from "../../tools/eventUtils";
import {setErrorInputState, setOKInputState} from "../../tools/inputUtils";

export const validationErrorHandler = (errCodesArr, usernameField, passwordField, emailField, confirmationField) => {

    for (let errCode of errCodesArr) {
        switch (errCode) {

            case validationStatus.USERNAME_FIELD_BAD:
                setErrorInputState(usernameField, "username isn't correct");
                singleTimeEventListener(usernameField, 'focus', setOKInputState);
                break;

            case validationStatus.USERNAME_FIELD_TOO_SHORT:
                setErrorInputState(usernameField, "username must be at least 3 characters");
                singleTimeEventListener(usernameField, 'focus', setOKInputState);
                break;

            case validationStatus.PASSWORD_FIELD_EMPTY:
                setErrorInputState(passwordField, "enter password");
                singleTimeEventListener(passwordField, 'focus', setOKInputState);
                break;

            case validationStatus.PASSWORD_FIELD_BAD:
                setErrorInputState(passwordField, "password must be at least 8 characters");
                singleTimeEventListener(passwordField, 'focus', setOKInputState);
                break;

            case validationStatus.EMAIL_FIELD_BAD:
                setErrorInputState(emailField, "enter a correct email");
                singleTimeEventListener(emailField, 'focus', setOKInputState);
                break;

            case validationStatus.EMAIL_FIELD_EMPTY:
                setErrorInputState(emailField, "enter email");
                singleTimeEventListener(emailField, 'focus', setOKInputState);
                break;

            case validationStatus.CONFIRMATION_FIELD_BAD:
                setErrorInputState(confirmationField, "passwords don't match");
                singleTimeEventListener(confirmationField, 'focus', setOKInputState);
                break;
        }
    }
};