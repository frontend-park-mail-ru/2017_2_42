/**
 * Created by zwirec on 16.09.17.
 */
import {Block} from "../block/block"

export class Page extends Block {
    constructor(form = []) {
        const el = document.createElement('section');
        super(el);
        const f = Block.Create('form', form.attrs || {}, form.classes || []);
        this.append(f)
    }

    reset() {
        this.el.reset();
    }
}