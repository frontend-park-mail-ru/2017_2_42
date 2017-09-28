/**
 * Created by zwirec on 28.09.17.
 */

import {Block} from "../block/block"
import {signup_fields} from "../config/signup-fields";
import {Input} from "../input/input";


export class Form extends Block {
    constructor(classes = []) {
        const el = document.createElement('form');
        classes.forEach((cls) => {
            el.classList.add(cls)
        });
        super(el);
        this.childArr = [];
        this.listenerRemovers = [];
        // blocks.forEach(function (b) {
        //     this.append(b);
        // }.bind(this));
    }

    onSubmit(callback) {
        this._elem.addEventListener('submit', function (e) {
            e.preventDefault();
            const formdata = {};
            const elements = this._elem.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        }.bind(this));
    }

    setErrorInputState(fields = {}) {
        for (let name in fields) {
            const input = this._elem.elements[name];
            input.classList.remove("input-ok");
            input.classList.add("input-error");
            const p = input.nextElementSibling;
            p.style.display = "block";
            p.textContent = fields[name]
        }

    }

    setOKInputState(fields = {}) {
        for (let name in fields) {
            const input = this._elem.elements[name];
            input.classList.remove("input-error");
            input.classList.add("input-ok");
            const p = input.nextElementSibling;
            p.style.display = "none";
        }

    }

    reset() {
        this.el.reset();
    }
}
