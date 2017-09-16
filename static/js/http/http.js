'use strict';

export class http {
    static _server_path = '';

    /**
     * GET request to server
     * @param path path of request
     * @param callback function that handles xhr response and response body
     */
    static get = (path, callback) => {
        this._request('GET', path, null, callback);
    };


    /**
     * POST request to server.
     * @param path path of request
     * @param body body of request
     * @param callback function that handles xhr response and response body
     */
    static post = (path, body, callback) => {
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
    static _request = (method, path, body, callback) => {
        if (method !== 'GET' && method !== 'POST' ||
            typeof path !== "string" ||
            typeof body !== "string" ||
            typeof callback !== "function") {

            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.open(method, this._server_path + path, true);
        xhr.withCredentials = true;

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (+xhr.status >= 500) {
                callback(xhr, {serverStatus: 'SERVER_DOWN'});
            }

            const response = JSON.parse(xhr.responseText);
            response.serverStatus = 'OK';

            callback(xhr, response);
        };

        if (method === 'GET') {
            xhr.send();
        } else {
            xhr.send(body);
        }
    }
}