// 'use strict';
//
// import {http} from '../../modules/http';
// import {ErrorsHandler} from '../../tools/errors/errorsHandler';
// import {Validator} from '../../modules/validator';
// import {PATHS} from '../../tools/paths';
// import {errors} from '../../tools/errors/errors';
// import {app} from '../../main';
//
// /**
//  * Login form model page
//  */
// export class LoginForm {
//   /**
//    * Initializes main vars
//    * @param {Object} page
//    */
//   constructor(page) {
//     this.formValues = {
//       username: null,
//       password: null,
//     };
//
//     this.page = page;
//
//     this.form = this.page.getElementsByTagName('form')[0];
//
//     this.usernameField = this.form.elements['username'];
//     this.passwordField = this.form.elements['password'];
//
//     this.errorHandler = new ErrorsHandler(
//       this.usernameField, this.passwordField);
//   }
//
//   /**
//    *
//    */
//   show() {
//     this._addSubmitListener();
//   }
//
//   /**
//    *
//    */
//   hide() {
//     this._removeSubmitListener();
//   }
//
//   /**
//    * Collects values from form
//    * @private
//    */
//   _getValues() {
//     this.formValues.username = this.usernameField.value;
//     this.formValues.password = this.passwordField.value;
//   }
//
//   /**
//    * Event listener callback
//    * @param {Event} event event
//    * @private
//    */
//   _onSubmit(event) {
//     event.preventDefault();
//     this._getValues();
//
//     Validator.validateLoginForm(this.formValues)
//       .then(() => this._loginUser())
//       .then(() => app.go(app.goMap.gamePage))
//       .catch((errorsArr) => this.errorHandler.handle(errorsArr));
//   }
//
//   /**
//    * Sends a request for login
//    * @return {Promise}
//    * @private
//    */
//   _loginUser() {
//     const requestBody = JSON.stringify(this.formValues);
//
//     return http.prPost(PATHS.LOGIN_PATH, requestBody)
//       .catch((xhr) => {
//         if (xhr.status >= 500) {
//           throw new Array(errors.SERVER_UNAVAILABLE);
//         }
//
//         let resp = JSON.parse(xhr.responseText);
//         throw new Array(resp.message);
//       });
//   }
//
//   /**
//    *
//    * @private
//    */
//   _addSubmitListener() {
//     this.form.addEventListener('submit', (ev) => this._onSubmit(ev));
//   }
//
//   /**
//    *
//    * @private
//    */
//   _removeSubmitListener() {
//     this.form.removeEventListener('submit', (ev) => this._onSubmit(ev));
//   }
// }
