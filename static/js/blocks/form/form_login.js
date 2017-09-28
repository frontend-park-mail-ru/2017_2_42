/**
 * Created by zwirec on 28.09.17.
 */


import {Form} from "./form";
import {Block} from "../block/block";
import {Input} from "../input/input";
import {social_button} from "../config/login-fields";


export default class FormLogin extends Form {
    constructor() {
        super(["login"]);
        let form_blocks = [Block.Create('h2', {}, ['login-header'], 'LOGIN')];
        for (let input of signup_fields) {
            let div = Block.Create('div', {}, ["input__container"]);
            let inp = new Input(input.attrs, input.classes);
            //TODO сделать на input.on('click', callback) смену состояния
            div.append(inp);
            div.append(Block.Create('p', {}, ["error-message"]));
            form_blocks.push(div)
        }
        form_blocks.push(new Input({type:'submit', value:'LOGIN'}));
        form_blocks.push(new Input({type:'button', value:'SIGNUP'}));
        form_blocks.push(Block.Create('p', {}, ["social-login"], "or login with"));
        let social = Block.Create("ul", {}, ['social']);
        for (let a of social_button) {
            social.append(Block.Create("li").append(Block.Create("a", {}, a.classes, a.value)));
        }
        form_blocks.push(social);
        form_blocks.forEach(function(b) {
            this.append(b);
            this.chlildArr.append(b)
        });

    }
}