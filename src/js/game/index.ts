///<reference path="../../../node_modules/@types/fabric/index.d.ts"/>
/**
 * Created by zwirec on 07.10.17.
 */


import  {BucketBody, CircleBody, PIXEL_TO_METERS, RectBody} from './body';

import {b2World} from './Box2D/Dynamics/b2World';

import {b2AABB} from './Box2D/Collision/b2Collision';
import {b2_pi} from './Box2D/Common/b2Settings';
import {StartMessage} from './gameLogic/Message';
import {Game} from './gameLogic/game';

function init() {
    let game = new Game({});

    game.load('c').then();


    document.getElementById('btn-sbscr').addEventListener('click', () => {
        game.gameService.sendSocketMessage('{"class": "SubscribeMessage", "board": 18}');
    });

    document.getElementById('btn-start').addEventListener('click', () => {
        let startMsg = new StartMessage(game);
        startMsg.HandleRequest();
    });

    document.ontouchend = function callback(event) {
        game.getState().onRun();
    };
}
init();
