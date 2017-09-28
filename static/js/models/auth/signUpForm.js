'use strict';

import {ErrorsHandler} from "../../tools/errors/errorsHandler";
import {Validator} from "../../modules/validator";
import {http} from "../../modules/http";
import {PATHS} from "../../tools/paths";
import {errors} from "../../tools/errors/errors";
import {app} from "../../main";
import {Form} from "../../blocks/form/form";
import {signUpFields, signUpConfig} from "./signUpConfig";

/**
 * Sign up form model page
 */
export class SignUpForm extends Form {
  /**
   * Initializes main vars
   */
  constructor(form, page) {
    super(form.elem, form.childArr);

    this.page = page;
    this.page.appendChild(this.elem);

    this.errorHandler = new ErrorsHandler(
      this.childArr[0],
      this.childArr[2],
      this.childArr[1],
      this.childArr[3]
    );
  }

  static Create(page) {
    let form = super.Create(signUpConfig, signUpFields);

    return new SignUpForm(form, page);
  }

  /**
   *
   */
  show() {
    this.on('submit', function (e) {
      e.preventDefault();
      this._collectData();

      Validator.validateSignUpForm(this.values)
        .then(() => this._signUpNewUser())
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
  _signUpNewUser() {
    const requestBody = JSON.stringify(this.values);

    return http.prPost(PATHS.SIGNUP_PATH, requestBody)
      .catch((xhr) => {
        if (xhr.status >= 500) {
          throw [errors.SERVER_UNAVAILABLE,];
        }
        const resp = JSON.parse(xhr.responseText);
        throw [resp.message,];
      });
  };
}