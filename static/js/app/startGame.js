/**
 * Created by zwirec on 16.09.17.
 */

"use strict";

import {User} from "../models/user/user";

export const user = new User();

export const startGame = () => {
    const playGamePage = new Page(document.getElementById("play-game"));
    const playGameBtn = playGamePage.elem.getElementsByClassName("play-game-btn");
    playGameBtn.addEventListener('click', (event) => {
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
