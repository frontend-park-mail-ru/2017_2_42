// import '../css/main.css';
// import 'html-loader!../index.html';
import './views/aboutView/aboutView.css';
import './views/gameView/gameView.css';
import './views/startView/startView.css';
import './views/offlineLobbyView/lobbyView.css';
import './views/loginView/loginView.css';
import './views/signUpView/signUpView.css';
import 'normalize.css';

import Application from './application';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js').then(function(reg) {
    // регистрация сработала
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
}

const app = new Application();
app.start();
