/**
 * Created by zwirec on 28.09.17.
 */

import {Block} from "../block/block"


export class Form extends Block {
    constructor(blocks = []) {
        const el = document.createElement('form');
        super(el);
        blocks.forEach(function (b) {
            this.append(b);
        }.bind(this));
    }

    onSubmit(callback) {
        this.el.addEventListener('submit', function (e) {
            e.preventDefault();
            const formdata = {};
            const elements = this.el.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        }.bind(this));
    }

    setErrorInputState(fields = {}) {
        for (let name of fields) {
            const input = this.el.getElementsByName(name)[0];
            input.classList.remove("input-ok");
            input.classList.add("input-error");
            const p = input.nextElementSibling;
            p.style.display = "block";
            p.textContent = fields[name]
        }

    }
    setOKInputState(fields = {}) {
        for (let name of fields) {
            const input = this.el.getElementsByName(name)[0];
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
