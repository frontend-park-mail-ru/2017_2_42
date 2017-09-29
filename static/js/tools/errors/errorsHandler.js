import {errors} from "./errors";
import {setErrorInputState, setOKInputState} from "../inputUtils";
import {disposableListener} from "../eventUtils";

export class ErrorsHandler {
  constructor(usernameInput, passwordInput,
              emailInput, confirmationInput) {
    this.usernameInput = usernameInput;
    this.passwordInput = passwordInput;
    this.emailInput = emailInput;
    this.confirmationInput = confirmationInput;
  }

  handle(errorsArr) {
    for (let error of errorsArr) {
      switch (error) {
        case errors.USERNAME_FIELD_EMPTY:
          this.usernameInput.setErrorInputState('enter username');
          break;

        case errors.USERNAME_FIELD_BAD:
          this.usernameInput.setErrorInputState('username isn\'t correct');
          break;

        case errors.USERNAME_FIELD_TOO_SHORT:
          this.usernameInput.setErrorInputState('username must be at least ' +
            '3 characters');
          break;

        case errors.USERNAME_ALREADY_EXISTS:
          this.usernameInput.setErrorInputState('username already exists');
          break;

        case errors.USERNAME_NOT_EXISTS:
          this.usernameInput.setErrorInputState('username doesn\'t exist');
          break;

        case errors.EMAIL_FIELD_EMPTY:
          this.emailInput.setErrorInputState('enter email');
          break;

        case errors.EMAIL_FIELD_BAD:
          this.emailInput.setErrorInputState('enter a correct email');
          break;

        case errors.EMAIL_ALREADY_EXISTS:
          this.emailInput.setErrorInputState('user with this email already exists');
          break;

        case errors.PASSWORD_FIELD_EMPTY:
          this.passwordInput.setErrorInputState('enter password');
          break;

        case errors.PASSWORD_FIELD_BAD:
          this.passwordInput.setErrorInputState('password must be at least ' +
            '8 characters');
          break;

        case errors.PASSWORD_WRONG:
          this.passwordInput.setErrorInputState('wrong password');
          break;

        case errors.CONFIRMATION_FIELD_BAD:
          this.confirmationInput.setErrorInputState('password doesn\'t match');
          break;
      }
    }
  }
}