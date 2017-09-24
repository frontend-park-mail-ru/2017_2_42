import {disposableListener} from '../../tools/eventUtils';
import {removeSignupSubmitListener} from './signUpNewUser';
import {backendConflictErrors} from '../errors/signupErrors';
import {setErrorInputState, setOKInputState} from '../../tools/inputUtils';
import {user} from '../../app/startGame';
// import {backendBadError} from '../errors/signupErrors';

export const signUpForm = document.getElementById('signup')
  .getElementsByTagName('form')[0];

export const usernameField = signUpForm.elements['username'];
export const emailField = signUpForm.elements['email'];
export const passwordField = signUpForm.elements['password'];
export const confirmationField = signUpForm.elements['confirm-password'];


export const signupResponseHandler = (xhr, resp) => {
  switch (xhr.status) {
    case 200:
      user.login(usernameField.value, emailField.value);
      removeSignupSubmitListener();
      break;

    case 400:
      setErrorInputState(usernameField, 'username bad');
      disposableListener(usernameField, 'click', setOKInputState);

      setErrorInputState(emailField, 'email bad');
      disposableListener(emailField, 'click', setOKInputState);

      setErrorInputState(confirmationField, 'passwords bad');
      disposableListener(confirmationField, 'click', setOKInputState);

      setErrorInputState(confirmationField, 'passwords don\'t match');
      disposableListener(confirmationField, 'click', setOKInputState);
      break;


    case 409:
      const error = resp.error;

      switch (error) {
        case backendConflictErrors.EMAIL_ALREADY_EXISTS:
          setErrorInputState(emailField, 'email already exists');
          disposableListener(emailField, 'click', setOKInputState);
          break;

        case backendConflictErrors.USERNAME_ALREADY_EXISTS:
          setErrorInputState(usernameField, 'username already exists');
          disposableListener(usernameField,
            'click', setOKInputState);
          break;

        default:
          break;
      }
      break;
  }
};
