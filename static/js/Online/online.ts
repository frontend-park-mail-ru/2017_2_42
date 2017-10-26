import {App} from '../application';
import eventBus, {EventBus, ScopesEnum, EventsEnum} from '../modules/eventBus';
import router, {Router} from '../modules/router';
import userService, {UserService} from '../services/userService';

import LoginView from './views/loginView/loginView';
import SignUpView from './views/signUpView/signUpView';
import GameView from '../views/gameView/gameView';

/**
 * Class implements multiplayer logic of application
 *
 * @class Multiplayer
 * @implements {App}
 */
export default class Online implements App {
  private rootNode: HTMLElement;
  private router: Router;
  private bus: EventBus;
  private userService: UserService;
  private urlRoot: string;

  /**
   * Creates an instance of Multiplayer.
   * @param {HTMLElement} parentNode root element for views
   * @memberof Multiplayer
   */
  constructor(parentNode: HTMLElement) {
    this.rootNode = parentNode;
    this.router = router;
    this.bus = eventBus;
    this.userService = userService;
    this.urlRoot = '/online';

    this.router.register(`${this.urlRoot}/login`, LoginView);
    this.router.register(`${this.urlRoot}/sign_up`, SignUpView);
    this.router.register(`${this.urlRoot}/game`, GameView);

    this.bus.on(ScopesEnum.auth, EventsEnum.user_signed_up, () => {
      // todo First visit advices
      router.go(`${this.urlRoot}/lobby`);
    });

    this.bus.on(ScopesEnum.auth, EventsEnum.user_signed_up, () => {
      router.go(`${this.urlRoot}/lobby`);
    });
  }

  start(): void {
    if (this.userService.getUser()) {
      return this.bus.emit(ScopesEnum.auth, EventsEnum.user_logged_in);
    }
    return router.go(`${this.urlRoot}/login`);
  }

  stop() {

  }

  pause() {

  }

  resume() {

  }
}
