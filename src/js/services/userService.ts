import PATHS from '../config/paths';
import { CONNECTION_ERR, JSON_PARSE_ERR, UNEXPECTED_ERR } from '../errors';
import User from '../models/user';
import eventBus, { EventBus } from '../modules/eventBus';
import Http from '../modules/http';
import Utils from '../modules/utils/utils';
import default from '../config/paths';


export class UserService {
  private user: User;
  private bus: EventBus;

  constructor() {
    // this.getUser(true);
    this.bus = eventBus;
  }

  public async getUser(force: boolean = false): Promise<User | null> {
    if (force) {
      try {
        this.user = await this.me();
      }
      catch (err) {
        Utils.debugError('Request failed', err);
        throw err;
      }
    }

    if (this.user === undefined) {
      throw CONNECTION_ERR;
    }

    return this.user;
  }

  public async login(data: Auth.UserLoginData): Promise<User> {
    let response: HttpNS.Response;

    try {
      response = await Http.Post(PATHS.LOGIN_PATH, JSON.stringify(data));
    } catch (err) {
      Utils.debugWarn(err.errorType);
      throw err.errorType;
    }

    if (response.errorType) {
      Utils.debugError(response.errorType);
      throw response.errorType;
    }

    switch (response.statusCode) {
      case 200:
        if (response.body) {
          this.user = response.body;
          return response.body;
        }

        Utils.debugError('User wasn\'t returned from backend', response);
        throw UNEXPECTED_ERR;

      case 400:
        if (response.body && response.body.message) {
          throw response.body.message;
        }

        Utils.debugError('Something strange there', response);
        throw UNEXPECTED_ERR;

      default:
        Utils.debugError('WTF?', response);
        throw UNEXPECTED_ERR;
    }
  }

  public async signUp(data: Auth.UserSignUpData): Promise<User> {
    let response: HttpNS.Response;

    try {
      response = await Http.Post(PATHS.SIGNUP_PATH, JSON.stringify(data));
    } catch (err) {
      Utils.debugWarn('Request failed', err);
      throw err.errorType;
    }

    if (response.errorType) {
      Utils.debugError(response.errorType);
      throw response.errorType;
    }

    switch (response.statusCode) {
      case 200:
        if (response.body) {
          this.user = response.body;
          return response.body;
        }

        Utils.debugError('User wasn\'t return from backend');
        throw UNEXPECTED_ERR;

      case 400:
        if (response.body && response.body.message) {
          throw response.body.message;
        }

        Utils.debugError('Something strange here');
        throw UNEXPECTED_ERR;

      default:
        Utils.debugError('WTF?', response);
        throw UNEXPECTED_ERR;
    }
  }

  private async me(): Promise<User> {
    let response: HttpNS.Response;

    try {
      response = await Http.Get(PATHS.ME_PATH);
    } catch (err) {
      throw err.errorType;
    }

    switch (response.statusCode) {
      case 200:
        if (response.errorType) {
          throw response.errorType;
        }

        this.user = response.body;
        break;

      case 401:
        this.user = null;
        break;

      default:
        Utils.debugError('Something unexpected there: ', response);
        break;
    }
    return this.user;
  }

  public async logout(): Promise<void> {
    let response: HttpNS.Response;

    try {
      response = await Http.Delete(PATHS.LOGOUT_PATH);
    } catch (err) {
      throw err.errorType;
    }

    switch (response.statusCode) {
      case 200: {
        return;
      }
      case 401: {
        throw UNEXPECTED_ERR;
      }
      default: {
        Utils.debugError('Unexpected error here');
      }
    }
  }
}

const userService = new UserService();

export default userService;
