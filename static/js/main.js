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

// import './app/startGame';
//
let suf = new SignUpForm();
let lof = new LoginForm();


const sections = {
    login: Block.Create('section', {}, ['login-section']),
    signup: Block.Create('section', {}, ['signup-section']),
    add_username: Block.Create('section', {}, ['add-username-section']),
    start_game: Block.Create('section', {}, ['start-game-section']),
    game: Block.Create('section', {}, ['main-game-container-section']),
    hide() {
        this.login.hide();
        this.signup.hide();
        this.add_username.hide();
        this.start_game.hide();
        this.game.hide();
    },
};

sections.hide();

function openLogin() {
    if (!sections.login.ready) {
        let form_blocks = [];
        for (let input in login_fields) {
            let div = Block.Create('div', {}, ["input__container"]);
            div.append(Block.Create('input', input.attrs, input.classes));
            div.append(Block.Create('p', {}, ["error-message"]));
            form_blocks.append(div)
        }
        sections.login.loginform = new Form(form_blocks);
        sections.login.loginform.onSubmit(onSubmitLoginForm);
        let social = Block.Create("ul", {}, ['social']);
        for (let a in social_button) {
            social.append(Block.Create("li").append(Block.Create("a", {}, a.classes, a.value)));
        }
        sections.login
            .append(Block.Create('h2', {}, ["login-header"], 'LOGIN'))
            .append(sections.login.loginform)
            .append(Block.Create('input', {type: "submit", value: "LOGIN"}))
            .append(Block.Create('input', {type: "button", value: "SIGNUP"}))
            .append(Block.Create('p', {}, ["social-login"], "or login with"))
            .append(social);
        sections.login.ready = true;
    }
    sections.hide();
    // if (userService.isLoggedIn()) {
    //     return openMenu();
    // }
    //todo
    sections.login.show();
}


function openSignup() {
    if (!sections.signup.ready) {
        let form_blocks = [];
        for (let input in signup_fields) {
            let div = Block.Create('div', {}, ["input__container"]);
            div.append(Block.Create('input', input.attrs, input.classes));
            div.append(Block.Create('p', {}, ["error-message"]));
            form_blocks.append(div)
        }
        sections.signup.signupform = new Form(form_blocks);
        sections.signup.signupform.onSubmit(onSubmitSignupForm);
        sections.signup
            .append(Block.Create('h2', {}, [], 'SIGNUP'))
            .append(sections.signup.signupform)
            .append(Block.Create('input', {type:'submit', value:'DONE'}));
        sections.signup.ready = true;
    }
    sections.hide();
    if (userService.isLoggedIn()) {
        return openMenu();
    }
    sections.signup.show();
}

suf.show()
  .then((res) => {
    suf.hide();
    return lof.show();
  })
  .then(() => {
    lof.hide();
  });

