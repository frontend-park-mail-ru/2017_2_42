/**
 * Created by zwirec on 28.09.17.
 */

import {Form} from "./form";
import {Block} from "../block/block";


export class FormSignup extends Form{
    constructor() {
        super(["signup"]);
        let form_blocks = [Block.Create('h2', {}, ['signup-header'], 'SIGNUP')];
        for (let input of signup_fields) {
            let div = Block.Create('div', {}, ["input__container"]);
            let inp = new Input(input.attrs, input.classes);
            //TODO сделать на input.on('click', callback) смену состояния
            div.append(inp);
            div.append(Block.Create('p', {}, ["error-message"]));
            form_blocks.push(div)
        }
        form_blocks.push(new Input({type:'submit', value:'DONE'}));
        form_blocks.forEach(function(b) {
            this.append(b);
            this.chlildArr.append(b)
        })
    }
}