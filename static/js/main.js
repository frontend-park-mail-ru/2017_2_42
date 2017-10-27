// import '../css/main.css';
import 'html-loader!../index.html';
import './views/aboutView/aboutView.css';
import './views/gameView/gameView.css';
import './views/startView/startView.css';
import './Online/views/lobbyView/lobbyView.css';
import './Online/views/loginView/loginView.css';
import './Online/views/signUpView/signUpView.css';

import Application from './application';

const app = new Application();
app.start();
