'use strict';
import {PATHS} from '../tools/paths';

const _serverPath = PATHS.BACKEND_SERVER;

/**
 * Http class for making requests
 */
export class http {
  /**
   * GET request to server
   * @param {string} path path of request
   * @param {function(err, response)} callback function that handles
   * xhr response and response body
   */
  static get(path, callback) {
    this._request('GET', path, null, callback);
  };

  /**
   * POST request to server.
   * @param {string} path path of request
   * @param {string} body body of request
   * @param {function(err, response)} callback function that handles
   * xhr response and response body
   */
  static post(path, body, callback) {
    this._request('POST', path, body, callback);
  };

  /**
   * Request function sends request to server and handles it with callback
   * @param {string} method 'GET' or 'POST' method of request
   * @param {string} path path of request
   * @param {string} body body of request
   * @param {function(err, response)}callback function that handles xhr
   * response and response body
   * @private
   */
  static _request(method, path, body, callback) {
    if (method !== 'GET' && method !== 'POST' ||
      typeof path !== 'string' ||
      typeof body !== 'string' ||
      typeof callback !== 'function') {
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
        return;
      }

      let response = JSON.parse(xhr.responseText);

      if (response === undefined) {
        response = {};
      }

      response.serverStatus = 'OK';

      callback(xhr, response);
    };

    xhr.send(body);
  }

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
    return this._prRequest('GET', path, null)
  }


  /**
   * Promisified request method
   * @param {string} method 'GET' \ 'POST'
   * @param {string} path api path to request
   * @param {string || null} body body of request
   * @return {Promise} resolved on 200 or rejected on >= 400 promise
   * @private
   */
  static _prRequest(method, path, body) {
    return new Promise(function (resovle, reject) {
      const xhr = new XMLHttpRequest();

      xhr.open(method, _serverPath + path, true);
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

        const response = JSON.parse(xhr.responseText);
        resovle(response);
      };

      if (method === 'POST') {
        xhr.send(body);
      } else {
        xhr.send();
      }
    })
  }
}
