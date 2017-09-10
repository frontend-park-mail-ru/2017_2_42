/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_signUpNewUser__ = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validation__ = __webpack_require__(2);


let signUpForm = document.getElementById("signup");

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = signUpForm.elements['username'].value;
    let email = signUpForm.elements['email'].value;
    let password = signUpForm.elements['password'].value;
    let confirmation = signUpForm.elements['confirmation'].value;

    let errCode = Object(__WEBPACK_IMPORTED_MODULE_0__validation__["d" /* validateUsername */])(username) || Object(__WEBPACK_IMPORTED_MODULE_0__validation__["b" /* validateEmail */])(email) || Object(__WEBPACK_IMPORTED_MODULE_0__validation__["c" /* validatePassword */])(password, confirmation);

    if (errCode === undefined) {
        signUpNewUser(username, email, password);
        signUpForm.reset();
    } else {
        handleError(errCode);
    }
});

/**
 * Обработчик ошибок возникших при валидации формы регистрации
 * @param errCode код ошибки
 */
const handleError = (errCode) => {
    switch (errCode) {
        // 1000: 'Введите email',
        case 1000:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;

        // 1001: 'Введите ваш реальный email',
        case 1001:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;

        // 1100: 'Логин должен содержать минимум 3 символа',
        case 1100:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;

        // 1101: 'Логин должен начинаться с латинской буквы и содержать в себе не более двух символов "_" или "-"',
        case 1101:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;

        // 1200: 'Пароль должен быть не короче 8 символов',
        case 1200:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;

        // 1201: 'Пароли не совпадают',
        case 1201:
            // todo
            alert(__WEBPACK_IMPORTED_MODULE_0__validation__["a" /* flags */][errCode]);
            break;
    }
};

const signUpNewUser = (username, email, password, callback) =>{
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', '/signup', true);

    const user = {username, email, password};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }

        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };

    xhr.send();
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const flags = {
    1000: 'Введите email',
    1001: 'Введите ваш реальный email',
    1100: 'Логин должен содержать минимум 3 символа',
    1101: 'Логин должен начинаться с латинской буквы и содержать в себе не более двух символов "_" или "-"',
    1200: 'Пароль должен быть не короче 8 символов',
    1201: 'Пароли не совпадают',
};
/* harmony export (immutable) */ __webpack_exports__["a"] = flags;


/**
 * Проверяет email на лексическую валидность
 * @param email email для проверки
 * @returns {number} Код ошибки или undefined
 */
const validateEmail = (email) => {
    if (email.length === 0) {
        return 1000;
    }

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        return 1001;
    }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = validateEmail;


/**
 * Проверяет username на лексическую валидность
 * @param username username  для проверки
 * @returns {number} Код ошибки или undefined
 */
const validateUsername = (username) => {
    if (username.length < 3) {
        return 1100;
    }

    let re = /^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/;
    if (!re.test(username)) {
        return 1101;
    }
};
/* harmony export (immutable) */ __webpack_exports__["d"] = validateUsername;


/**
 * Проверяет пароли на лексическую валидность и совпадение
 * @param password пароль для проверки
 * @param confirmation подтверждение пароля для проверки
 * @return {number} Код ошибки или undefined
 */
const validatePassword = (password, confirmation) => {
    if (password.length < 8){
        return 1200;
    }

    if (password !== confirmation){
        return 1201;
    }
};
/* harmony export (immutable) */ __webpack_exports__["c"] = validatePassword;



/***/ })
/******/ ]);