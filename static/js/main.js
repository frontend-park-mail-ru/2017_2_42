import '../css/main.css';
import '../css/form-add-username.css';
import '../css/form-login.css';
import '../css/form-signup.css';
import '../css/game-container.css';
import 'html-loader!../index.html';
import {SignUpForm} from "./models/auth/signUpForm";
import {LoginForm} from "./models/auth/loginForm";
import {login_fields, social_button} from "./blocks/config/login-fields"
import {signup_fields} from "./blocks/config/signup-fields"
import {Block} from "./blocks/block/block";
import {Form} from "./blocks/form/form";
import {FormSignup} from "./blocks/form/form_signup";
import FormLogin from "./blocks/form/form_login";

// import './app/startGame';
//
// let suf = new SignUpForm();
// let lof = new LoginForm();


const app = new Block(document.getElementsByTagName('body')[0]);

const sections = {
    login: Block.Create('section', {}, ['login-section', 'forms']),
    signup: Block.Create('section', {}, ['signup-section', 'forms']),
    add_username: Block.Create('section', {}, ['add-username-section']),
    start_game: Block.Create('section', {}, ['play-game-section']),
    game: Block.Create('section', {}, ['main-game-container-section']),
    hide() {
        this.login.hide();
        this.signup.hide();
        this.add_username.hide();
        this.start_game.hide();
        this.game.hide();
    },
};

app.append(sections.start_game)
    .append(sections.signup)
    .append(sections.login)
    .append(sections.game)
    .append(sections.add_username);

sections.hide();

function openLogin() {
    if (!sections.login.ready) {
        sections.login.loginform = new FormLogin();
        // sections.login.loginform.onSubmit(onSubmitLoginForm);
        sections.login.ready = true;
    }
    sections.hide();
    // if (userService.isLoggedIn()) {
    //     return openMenu();
    // }
    //todo
    sections.login.show();
}

function openGame() {
    if (!sections.game.ready) {

    }
}

function openSignup() {
    if (!sections.signup.ready) {
        sections.signup.signupform = new FormSignup();
        sections.signup.signupform.onSubmit(function (data) {
            sections.signup.hide();
            openLogin();
        });
        sections.signup
            .append(sections.signup.signupform);
        sections.signup.ready = true;
    }
    sections.hide();
    // if (userService.isLoggedIn()) {
    //     return openMenu();
    // }
    //TODO сюда запили проверку на авторизацию иначе form.setErrorInputState
    sections.signup.signupform.setErrorInputState({username: "allbad"});
    sections.signup.show();
}

function openStartGame() {
    if (!sections.start_game.ready) {
        sections.start_game.append(Block.Create('div', {}, ['main'])
            .append(Block.Create('a', {}, ['play-game-btn'], 'PLAY GAME')));
        sections.start_game.on('click', function (event) {
            //TODO чекаем session_id
            //TODO если ок, то sections.startgame.hide(); openGame()
            sections.start_game.hide();
            openSignup();
        });
        sections.start_game.ready = true
    }
    sections.hide();
    sections.start_game.show()
}

openStartGame();

// suf.show()
//   .then((res) => {
//     suf.hide();
//     return lof.show();
//   })
//   .then(() => {
//     lof.hide();
//   });

