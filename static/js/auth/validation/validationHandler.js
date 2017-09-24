import {validationStatus} from '../errors/validationErrors';
import {disposableListener} from '../../tools/eventUtils';

import {setErrorInputState, setOKInputState} from '../../tools/inputUtils';

const handleError = (errCode, usernameField, passwordField,
                     emailField, confirmationField) => {
  switch (errCode) {
    case validationStatus.USERNAME_FIELD_BAD:
      setErrorInputState(usernameField, 'username isn\'t correct');
      disposableListener(usernameField, 'focus', setOKInputState);
      break;

    case validationStatus.USERNAME_FIELD_TOO_SHORT:
      setErrorInputState(usernameField, 'username must be at least ' +
        '3 characters');
      disposableListener(usernameField, 'focus', setOKInputState);
      break;

    case validationStatus.PASSWORD_FIELD_EMPTY:
      setErrorInputState(passwordField, 'enter password');
      disposableListener(passwordField, 'focus', setOKInputState);
      break;

    case validationStatus.PASSWORD_FIELD_BAD:
      setErrorInputState(passwordField, 'password must be at least ' +
        '8 characters');
      disposableListener(passwordField, 'focus', setOKInputState);
      break;

    case validationStatus.EMAIL_FIELD_BAD:
      setErrorInputState(emailField, 'enter a correct email');
      disposableListener(emailField, 'focus', setOKInputState);
      break;

    case validationStatus.EMAIL_FIELD_EMPTY:
      setErrorInputState(emailField, 'enter email');
      disposableListener(emailField, 'focus', setOKInputState);
      break;

    case validationStatus.CONFIRMATION_FIELD_BAD:
      setErrorInputState(confirmationField, 'password doesn\'t match');

      disposableListener(confirmationField,
        'focus', setOKInputState);

      break;
  }
};

export const validationErrorHandler = (errCodesArr, usernameField,
                                       passwordField, emailField,
                                       confirmationField) => {
  for (let errCode of errCodesArr) {
    handleError(errCode, usernameField,
      passwordField, emailField, confirmationField);
  }
};
