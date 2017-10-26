'use strict';
import PATHS from '../config/paths';

const serverPath = PATHS.BACKEND_SERVER;

/**
 * Http class for making requests
 */
export default class http {
  /**
   * Promisified post request
   * @param {string} path
   * @param {string} body
   * @return {Promise} resolved promise on 200 and rejected on >= 400
   */
  static prPost(path, body) {
    return this._prRequest('POST', path, body);
  }

  /**
   * Promisified get request
   * @param {string} path request path
   * @return {Promise} resolved promise on 200 and rejected on >= 400
   */
  static prGet(path) {
    return this._prRequest('GET', path, null);
  }

  /**
   * Promisified request method
   * @param {string} method 'GET' or 'POST' method
   * @param {string} path request path
   * @param {string} body request body
   * @return {Promise} resolved promise on 200 and rejected on >= 400
   * @private
   */
  static _prRequest(method, path, body) {
    return new Promise((resovle, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${serverPath}${path}`, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status >= 400) {
          reject(xhr);
          return;
        }

        let response;

        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          // error
        }

        resovle(response);
      };

      if (method === 'POST') {
        xhr.send(body);
      } else {
        xhr.send();
      }
    });
  }
}
