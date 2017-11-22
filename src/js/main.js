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

const app = new Application();
app.start();
