'use strict';

export class http {
    static get = (path, callback) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', path, true);
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

        xhr.send();
    };


    static post = (path, body, callback) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', path, true);
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

        xhr.send(body);
    }
}