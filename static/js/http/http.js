'use strict';
import {PATHS} from "../tools/paths";

const _serverPath = PATHS.BACKEND_SERVER;

export class http {

    /**
     * GET request to server
     * @param path path of request
     * @param callback function that handles xhr response and response body
     */
    static get(path, callback) {
        this._request('GET', path, null, callback);
    };

    /**
     * POST request to server.
     * @param path path of request
     * @param body body of request
     * @param callback function that handles xhr response and response body
     */
    static post(path, body, callback) {
        this._request('POST', path, body, callback);
    };

    /**
     * Request function sends request to server and handles it with callback
     * @param method 'GET' or 'POST' method of request
     * @param path path of request
     * @param body body of request
     * @param callback function that handles xhr response and response body
     * @private
     */
    static _request(method, path, body, callback) {
        if (method !== 'GET' && method !== 'POST' ||
            typeof path !== "string" ||
            typeof body !== "string" ||
            typeof callback !== "function") {

            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.open(method, _serverPath + path, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status >= 500) {
                let response = {};
                response.serverStatus = 'SERVER_DOWN';
                callback(xhr, response);
            }

            let response = JSON.parse(xhr.responseText);

            if (response === undefined) {
                response = {};
            }

            response.serverStatus = 'OK';

            callback(xhr, response);
        };

        xhr.send(body)
    }
}