import {errors} from "./errors";
import {setErrorInputState, setOKInputState} from "../inputUtils";
import {disposableListener} from "../eventUtils";

export class ErrorsHandler {
  constructor(usernameField, passwordField,
              emailField, confirmationField) {
    this.usernameField = usernameField;
    this.passwordField = passwordField;
    this.emailField = emailField;
    this.confirmationField = confirmationField;
  }

  handle(errorsArr) {
    for (let error of errorsArr) {
      switch (error) {
        case errors.USERNAME_FIELD_EMPTY:
          setErrorInputState(this.usernameField, 'enter username');
          disposableListener(this.usernameField, 'focus', setOKInputState);
          break;

        case errors.USERNAME_FIELD_BAD:
          setErrorInputState(this.usernameField, 'username isn\'t correct');
          disposableListener(this.usernameField, 'focus', setOKInputState);
          break;

        case errors.USERNAME_FIELD_TOO_SHORT:
          setErrorInputState(this.usernameField, 'username must be at least ' +
            '3 characters');
          disposableListener(this.usernameField, 'focus', setOKInputState);
          break;

        case errors.USERNAME_ALREADY_EXISTS:
          setErrorInputState(this.usernameField, 'username already exists');
          disposableListener(this.usernameField, 'focus', setOKInputState);
          break;

        case errors.USERNAME_NOT_EXISTS:
          setErrorInputState(this.usernameField, 'username doesn\'t exist');
          disposableListener(this.usernameField, 'focus', setOKInputState);
          break;

        case errors.EMAIL_FIELD_EMPTY:
          setErrorInputState(this.emailField, 'enter email');
          disposableListener(this.emailField, 'focus', setOKInputState);
          break;

        case errors.EMAIL_FIELD_BAD:
          setErrorInputState(this.emailField, 'enter a correct email');
          disposableListener(this.emailField, 'focus', setOKInputState);
          break;

        case errors.EMAIL_ALREADY_EXISTS:
          setErrorInputState(this.emailField, 'user with this email already exists');
          disposableListener(this.emailField, 'focus', setOKInputState);
          break;

        case errors.PASSWORD_FIELD_EMPTY:
          setErrorInputState(this.passwordField, 'enter password');
          disposableListener(this.passwordField, 'focus', setOKInputState);
          break;

        case errors.PASSWORD_FIELD_BAD:
          setErrorInputState(this.passwordField, 'password must be at least ' +
            '8 characters');
          disposableListener(this.passwordField, 'focus', setOKInputState);
          break;

        case errors.PASSWORD_WRONG:
          setErrorInputState(this.passwordField, 'wrong password');
          disposableListener(this.passwordField, 'focus', setOKInputState);
          break;

        case errors.CONFIRMATION_FIELD_BAD:
          setErrorInputState(this.confirmationField, 'password doesn\'t match');
          disposableListener(this.confirmationField,
            'focus', setOKInputState);
          break;
      }
    }
  }
}