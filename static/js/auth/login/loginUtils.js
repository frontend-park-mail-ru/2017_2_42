import {user} from '../../app/startGame';
import {removeLoginEventListener} from './loginUser';
import {backendBadErrors, backendConflictErrors} from '../errors/loginErrors';

export const loginForm = document.getElementById('login')
  .getElementsByTagName('form')[0];

export const usernameField = loginForm.elements['username'];
export const passwordField = loginForm.elements['password'];

export const loginResponseHandler = (xhr, resp, username, password) => {
  switch (xhr.status) {
    case 200:
      user.login(username, password);
      removeLoginEventListener();
      break;

    case 400:
      badRequestHandler(resp, username);
      break;

    case 409:
      conflictHandler(resp, username);
      console.log(1);
      break;
  }
};

const badRequestHandler = (resp, username) => {
  switch (resp.error.message) {
    case backendBadErrors.USERNAME_FIELD_EMPTY:

      break;

    case backendBadErrors.USERNAME_FIELD_BAD:

      break;

    case backendBadErrors.USERNAME_FIELD_TOO_SHORT:

      break;

    case backendBadErrors.PASSWORD_FIELD_EMPTY:

      break;

    case backendBadErrors.PASSWORD_FIELD_BAD:

      break;

    default:

      break;
  }
};

const conflictHandler = (resp, username) => {
  switch (resp.error.message) {
    case backendConflictErrors.USERNAME_NOT_EXISTS:

      break;

    case backendConflictErrors.PASSWORD_WRONG:

      break;

    default:

      break;
  }
};
