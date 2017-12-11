import config from '../config/config';
import PATHS from '../config/paths';

/**
 * Class implements basic HTTP requests
 */
export default class FetchService {
  /**
   * Get method implementation based on fetch
   * @param {string} path request path
   * @return {Promise<Response>} promise containing response type
   */
  public static get(path: string): Promise<Response> {
    return this.request('GET', path);
  }

  /**
   * Post method implementation based on fetch
   * @param {string} path request path
   * @param body request body
   * @return {Promise<Response>} promise containing response type
   */
  public static post(path: string, body: any): Promise<Response> {
    return this.request('POST', path, body);
  }

  /**
   * Put method implementation based on fetch
   * @param {string} path request path
   * @param body request body
   * @return {Promise<Response>} promise containing response type
   */
  public static put(path: string, body: any): Promise<Response> {
    return this.request('PUT', path, body);
  }

  /**
   * Delete method implementation based on fetch
   * @param {string} path request path
   * @return {Promise<Response>} promise containing response type
   */
  public static delete(path: string): Promise<Response> {
    return this.request('DELETE', path);
  }

  /**
   * Request implementation based on fetch
   * @param {string} method request method
   * @param {string} path request path
   * @param body request body
   * @return {Promise<Response>} promise containing response type
   */
  public static request(method: string, path: string, body?: any): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const init = {
      body: body,
      method: method,
      headers: headers,
      credentials: 'include',
      mode: config.debug ? 'cors' : 'same-origin',
    } as RequestInit;

    return fetch(`${PATHS.server.BACKEND_SERVER}${path}`, init);
  }
}