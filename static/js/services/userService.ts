import PATHS from '../config/paths';
import User from '../models/user';
import eventBus, {EventBus} from '../modules/eventBus';
import http from '../modules/http';
import Utils from '../modules/utils/utils';

const CONNECTION_ERROR = 'CONNECTION_ERROR';
const PARSE_ERROR = 'PARSE_ERROR';

export class UserService {
  private user: User;
  private bus: EventBus;

  constructor() {
    this.user = this.getUser(true);
    this.bus = eventBus;

  }

  getUser(force: boolean = false): User | null {
    if (!force) {
      return this.user;
    } else {
      this.me()
        .then((user) => this.user = user as User)
        .catch((error) => {
          Utils.debugWarn(error);
          this.user = null;
        });

      return this.user;
    }
  }

  public login(data) {
    return http.prPost(PATHS.LOGIN_PATH, JSON.stringify(data))
      .then((resp) => {
        if (!resp) {
          throw PARSE_ERROR;
        }

        this.user = resp.user;
        return resp.user;
      })
      .catch((xhr) => {
        if (xhr.status === 400) {
          throw JSON.parse(xhr.responseText).message;
        }
        throw CONNECTION_ERROR;
      });
  }

  public signUp(data) {
    return http.prPost(PATHS.SIGNUP_PATH, JSON.stringify(data))
      .then((resp) => {
        if (!resp) {
          throw PARSE_ERROR;
        }
        this.user = resp.user;
        return resp.user;
      })
      .catch((xhr) => {
        if (typeof xhr === 'string') {
          throw xhr;
        }

        if (xhr.status === 400) {
          throw JSON.parse(xhr.responseText).message;
        }
      });
  }

  private me(): Promise<User | string> {
    return http.prGet(PATHS.ME_PATH)
      .then((resp) => resp ? resp.user : null)
      .catch((xhr) => {
        if (xhr.status === 401) {
          return null;
        }
        throw CONNECTION_ERROR;
      });
  }
}

const userService = new UserService();

export default userService;
