import PATHS from '../config/paths';
import User from '../models/user';
import Utils from '../modules/utils/utils';
import FetchService from './FetchService';


export class UserService {
  private user: User;
  private serverResponded: boolean;
  private errors = {
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    JSON_PARSE_ERROR: 'JSON_PARSE_ERR',
    UNEXPECTED_ERROR: 'UNEXPECTED_ERR',
  };

  constructor() {
    this.me()
      .then((user: User | null) => {
        this.user = user;
        this.serverResponded = true;
      })
      .catch((error) => {
        Utils.debugError(error);
        this.serverResponded = false;
      });
  }

  public async login(data: Auth.UserLoginData): Promise<User> {
    let response: Response;

    try {
      response = await FetchService.post(PATHS.auth.LOGIN_PATH, JSON.stringify(data));
    } catch (err) {
      Utils.debugError(err);
      this.serverResponded = false;
      throw this.errors.CONNECTION_ERROR;
    }

    switch (response.status) {
      case 200:
        try {
          this.user = await response.json();
          return this.user;
        } catch (error) {
          Utils.debugError(error);
          throw this.errors.JSON_PARSE_ERROR;
        }

      case 400:
        let errs;

        try {
          errs = await response.json();
        } catch (error) {
          Utils.debugError(error);
          throw this.errors.JSON_PARSE_ERROR;
        }

        throw errs.message as string[];

      default:
        throw this.errors.UNEXPECTED_ERROR;
    }
  }

  public async signUp(data: Auth.UserSignUpData): Promise<User> {
    let response: Response;

    try {
      response = await FetchService.post(PATHS.auth.SIGN_UP_PATH, JSON.stringify(data));
    } catch (err) {
      Utils.debugWarn(err);
      this.serverResponded = false;
      throw this.errors.CONNECTION_ERROR;
    }

    switch (response.status) {
      case 200:
        try {
          this.user = await response.json();
          return this.user;
        } catch (error) {
          Utils.debugError(error);
          throw this.errors.JSON_PARSE_ERROR;
        }

      case 400:
        let errs;

        try {
          errs = await response.json() as string[];
        } catch (error) {
          Utils.debugError(error);
          throw this.errors.JSON_PARSE_ERROR;
        }

        throw errs.message;

      default:
        throw this.errors.UNEXPECTED_ERROR;
    }
  }

  public async logout(): Promise<void> {
    let response: Response;

    try {
      response = await FetchService.delete(PATHS.auth.LOGOUT_PATH);
    } catch (err) {
      this.serverResponded = false;
      throw this.errors.CONNECTION_ERROR;
    }

    switch (response.status) {
      case 200: {
        this.user = null;
        return;
      }
      case 401: {
        throw this.errors.UNEXPECTED_ERROR;
      }
      default: {
        Utils.debugError('Unexpected error here');
      }
    }
  }

  public async getUser(force: boolean = false): Promise<User | null> {
    if (force) {
      this.serverResponded = undefined;

      try {
        this.user = await this.me();
        this.serverResponded = true;
        return this.user;
      }
      catch (error) {
        Utils.debugError(error);
        this.serverResponded = false;
        throw error;
      }
    }

    while (this.serverResponded === undefined) {
    }

    if (this.serverResponded === false) {
      throw this.errors.CONNECTION_ERROR;
    }

    return this.user;
  }

  private async me(): Promise<User | null> {
    let response: Response;

    try {
      response = await FetchService.get(PATHS.auth.ME_PATH);
    } catch (err) {
      throw this.errors.CONNECTION_ERROR;
    }

    if (response.ok && response.status === 200) {
      try {
        return await response.json() as User;
      } catch {
        throw this.errors.JSON_PARSE_ERROR;
      }
    }

    if (response.status === 401) {
      return null;
    }

    throw this.errors.UNEXPECTED_ERROR;
  }
}

const userService = new UserService();

export default userService as UserService;
