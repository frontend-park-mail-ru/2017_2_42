'use strict';

import {http} from "../../http/http";

export class User {
    constructor() {
        this.username = null;
        this.email = null;
    }

    login(username, email) {
        this.username = username;
        this.email = email;
    }

    whoami() {
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