'use strict';

import PATHS from '../config/paths';
import { CONNECTION_ERR, JSON_PARSE_ERR } from '../errors';
import Utils from './utils/utils';


export default class Http {
  /**
   * GET method over XHR
   *
   * @static
   * @param {string} path request path
   * @returns {Promise<Response>} promise that resolves when connection is ok and rejects on error
   * @memberof Http
   */
  public static Get(path: string): Promise<HttpNS.Response> {
    return this.request('GET', path);
  }

  /**
   * POST method over XHR
   *
   * @static
   * @param {string} path request path
   * @param {string} body request body
   * @returns {Promise<Response>} promise that resolves when connection is ok and rejects on error
   * @memberof Http
   */
  public static Post(path: string, body: string): Promise<HttpNS.Response> {
    return this.request('POST', path, body);
  }

  /**
   * PUT method over XHR
   *
   * @static
   * @param {string} path request path
   * @param {string} body request body
   * @returns {Promise<Response>} promise that resolves when connection is ok and rejects on error
   * @memberof Http
   */
  public static Put(path: string, body: string): Promise<HttpNS.Response> {
    return this.request('PUT', path, body);
  }

  /**
   * DELETE method over XHR
   *
   * @static
   * @param {string} path request path
   * @returns {Promise<Response>} promise that resolves when connection is ok and rejects on error
   * @memberof Http
   */
  public static Delete(path: string): Promise<HttpNS.Response> {
    return this.request('DELETE', path);
  }

  /**
   * Request function to provide interface over XMLHttpRequest
   *
   * @private
   * @static
   * @param {string} method request method
   * @param {string} path request path
   * @param {string} [body] body to send to server
   * @returns {Promise<Response>} promise that resolves when connected and rejects on error
   * @memberof Http
   */
  private static request(method: string, path: string, body?: string)
    : Promise<HttpNS.Response> {
    return new Promise<HttpNS.Response>((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.open(method, `${this.serverPath}${path}`, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

      xhr.onerror = (): void => {
        reject({ errorType: CONNECTION_ERR });
      };

      xhr.onreadystatechange = (): void => {
        if (xhr.readyState !== 4) {
          return;
        }

        let json, error;

        if (xhr.responseText) {
          try {
            json = JSON.parse(xhr.responseText);
          } catch (err) {
            error = JSON_PARSE_ERR;
          }
        }

        resolve({
          statusCode: xhr.status,
          errorType: error,
          body: json,
        });
      };

      xhr.send(body);
    });
  }

  private static readonly serverPath: string = PATHS.BACKEND_SERVER;
}
