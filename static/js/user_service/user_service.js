'use strict';

import {http} from "../http/http";

export class User {
    constructor() {
        this.username = null;
        this.email = null;
    }

    signup(username, email, password, confirmation, callback) {
        const reqBody = JSON.stringify({username, email, password, confirmation});
        http.post('/auth/signup', reqBody, (xhr, response) => {
            if (response.status === "SUCCESS" && +xhr.status === 200) {
                this.username = username;
                this.email = email;
            }
            callback(xhr, response);
        });
    }

    login(username, password, callback) {
        const reqBody = JSON.stringify({username, password});
        http.post('/auth/login', reqBody, callback);
    }

    _whoami() {
        http.get('/auth/me', (xhr, response) => {
            if (response.serverStatus !== 'OK') {
                return;
            }

            switch (+xhr.status) {
                case 200:
                    this.username = response.username;
                    this.email = response.email;
                    break;

                case 401:
                    this.username = null;
                    this.email = null;
                    break;

                default:
                    break;
            }

        })
    }

    isAuthorized() {
        return !!this.username;
    }
}