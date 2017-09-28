/**
 * Created by zwirec on 28.09.17.
 */

import {Block} from "../block/block";

export class GameContainer extends Block {
    constructor(blocks = []) {
        const el = document.createElement('div');
        el.classList.add('main-game-container');
        super(el);
        for (let block in blocks) {
            this.append(block)
        }
    }

}