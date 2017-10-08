import {http} from './http';
import {PATHS} from '../tools/paths';

export default class UserService {
  static me() {
    return http.prGet(PATHS.ME_PATH)
      .then((resp) => resp ? resp.user : null)
      .catch((xhr) => {
        if (xhr.status === 401) {
          return null;
        }
        throw 'CONNECTION_ERROR';
      });
  }

  static login(data) {
    return http.prPost(PATHS.LOGIN_PATH, JSON.stringify(data))
      .then(resp => {
        if (!resp) {
          throw ('JSON ERROR');
        }

        return resp.user;
      })
      .catch(xhr => {
        if (xhr.status === 400) {
          throw JSON.parse(xhr.responseText).message;
        }
      });
  }

  static signUp(data) {

    return http.prPost(PATHS.SIGNUP_PATH, JSON.stringify(data))
      .then(resp => {
        if (!resp) {
          throw 'JSON ERROR';
        }

        return resp.user;
      })
      .catch(xhr => {
        if (typeof xhr === 'string') {
          throw xhr;
        }

        if (xhr.status === 400) {
          throw JSON.parse(xhr.responseText).message;
        }
      });
  }
}