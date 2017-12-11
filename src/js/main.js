import 'normalize.css';
import '../css/main.scss';

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

const preGameCss = document.querySelector('#cssWhileLoading');
const preGameDiv = document.querySelector('#loading');

const preGameRemover = () => {
  document.body.removeChild(preGameDiv);
  document.head.removeChild(preGameCss);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    preGameDiv.innerHTML = '';
    preGameDiv.classList.add('loaded');
    app.start();
    setTimeout(preGameRemover, 2000);
  }
};
