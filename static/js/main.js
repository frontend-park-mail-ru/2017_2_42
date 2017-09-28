import '../css/main.css';
import '../css/form-add-username.css';
import '../css/form-login.css';
import '../css/form-signup.css';
import '../css/game-container.css';
import 'html-loader!../index.html';
import {SignUpForm} from "./models/auth/signUpForm";
import {LoginForm} from "./models/auth/loginForm";

// import './app/startGame';
//
let suf = new SignUpForm();
let lof = new LoginForm();

suf.show()
  .then((res) => {
    suf.hide();
    return lof.show();
  })
  .then(() => {
    lof.hide();
  });

