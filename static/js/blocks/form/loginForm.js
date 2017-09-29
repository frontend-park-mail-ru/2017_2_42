/**
 * Created by zwirec on 29.09.17.
 */

'use strict';

import {ErrorsHandler} from '../../tools/errors/errorsHandler';
import {Validator} from '../../modules/validator';
import {http} from '../../modules/http';
import {PATHS} from '../../tools/paths';
import {errors} from '../../tools/errors/errors';
import {app} from '../../main';
import {Form} from './form';
import {loginConfig, loginFields} from '../config/loginConfig';

/**
 * Sign up form model page
 */
export class LoginForm extends Form {
    /**
     * @param {Form} form built form
     * @param {Object} page page that will contain this form
     * Initializes main vars
     */
    constructor(form, page) {
        super(form.elem, form.childArr);

        this.page = page;
        this.page.appendChild(this.elem);

        let h2 = document.createElement('h2');
        h2.classList.add('login-header');
        h2.innerText = 'LOGIN';
        this.elem.insertBefore(h2, this.elem.firstChild);

      let button = this.elem.elements['signup'];
        button.addEventListener('click', function(ev) {
            app.go(app.goMap.signup);
        });

        this.errorHandler = new ErrorsHandler(
            this.childArr[0],
            this.childArr[1]
        );
    }

    /**
     * Method that creates signup form
     * @param {Object} page page that will contain this form
     * @return {LoginForm} built form
     * @constructor
     */
    static create(page) {
        let form = super.create(loginConfig, loginFields);

        return new LoginForm(form, page);
    }

    /**
     * Shows the form
     */
    show() {
        this.on('submit', function(e) {
            e.preventDefault();
            this._collectData();

            Validator.validateLoginForm(this.values)
                .then(() => this._loginUser())
                .then(() => app.go(app.goMap.gamePage))
                .catch((errorsArr) => this.errorHandler.handle(errorsArr));
        }.bind(this));

        super.show();
    }


    /**
     * Signs up new user via http request
     * @return {Promise}
     * @private
     */
    _loginUser() {
        const requestBody = JSON.stringify(this.values);

        return http.prPost(PATHS.LOGIN_PATH, requestBody)
            .catch((xhr) => {
                if (xhr.status >= 500) {
                    throw new Array(errors.SERVER_UNAVAILABLE);
                }
                const resp = JSON.parse(xhr.responseText);
                throw new Array(resp.message);
            });
    };
}
