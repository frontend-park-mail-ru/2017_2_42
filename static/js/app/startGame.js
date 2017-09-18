/**
 * Created by zwirec on 16.09.17.
 */


"use strict";

import {User} from "../models/user/user";
import {addSignupSubmitListener} from "../auth/signup/signUpNewUser";
import {addLoginEventListener} from "../auth/login/loginUser";

export const user = new User();

export const startGame = () => {
    const playGamePage = new Page(document.getElementById("play-game"));
    playGamePage.elem.addEventListener('click', (event) => {
        event.preventDefault();
        user.whoami();
        if (user.isAuthorized()) {
            playGamePage.hide();
            new Page(document.getElementById("login")).show();
        } else {
            playGamePage.hide();
            new Page(document.getElementById("signup")).show();
        }
    })
};

addSignupSubmitListener();
addLoginEventListener();

