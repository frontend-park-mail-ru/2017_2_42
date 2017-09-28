import '../css/main.css';
import '../css/form-add-username.css';
import '../css/form-login.css';
import '../css/form-signup.css';
import '../css/game-container.css';
import 'html-loader!../index.html';

import {App} from "./models/app";

export const app = new App();
app.run();

