import {validateLoginForm} from '../validation/validation';

import {loginForm, loginResponseHandler, passwordField, usernameField,} from './loginUtils';

import {validationErrorHandler} from '../validation/validationHandler';
import {http} from '../../http/http';
import {PATHS} from '../../tools/paths';

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
  const loginForm = {username, password};
  const reqBody = JSON.stringify(loginForm);

  http.post(PATHS.LOGIN_PATH, reqBody, (xhr, resp) => {
    if (resp.serverStatus !== 'OK') {
      alert('lolo');
      return;
    }

    loginResponseHandler(xhr, resp, username, password);
  });
};

export const addLoginEventListener = () => {
  loginForm.addEventListener('submit', loginListenerCallback);
};

export const removeLoginEventListener = () => {
  loginForm.removeEventListener('submit', loginListenerCallback);
};
