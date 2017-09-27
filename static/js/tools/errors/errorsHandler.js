import {errors} from "./errors";

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

          break;

        case errors.USERNAME_FIELD_BAD:

          break;

        case errors.USERNAME_FIELD_TOO_SHORT:

          break;

        case errors.USERNAME_ALREADY_EXISTS:

          break;

        case errors.USERNAME_NOT_EXISTS:

          break;

        case errors.EMAIL_FIELD_EMPTY:

          break;

        case errors.EMAIL_FIELD_BAD:

          break;

        case errors.EMAIL_ALREADY_EXISTS:

          break;

        case errors.PASSWORD_FIELD_EMPTY:

          break;

        case errors.PASSWORD_FIELD_BAD:

          break;

        case errors.PASSWORD_WRONG:

          break;

        case errors.CONFIRMATION_FIELD_BAD:

          break;
      }
    }
  }
}