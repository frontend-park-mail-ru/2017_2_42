import User from './models/user';
import eventBus, { EventsEnum, EventBus, ScopesEnum } from './modules/eventBus';
import router, { Router } from './modules/router';
import Utils from './modules/utils/utils';
import Offline from './offline';
import Online from './online';
import userService from './services/userService';
import ViewPaths from './views/pagePaths';
import Views from './views/views';

const gameType = {
  OFFLINE: 'singleplayer',
  ONLINE: 'multiplayer',
  NONE: 'none',
};

/**
 * Main class for web application.
 *
 */
export default class Application implements Application.App {
  private gameType: string;
  private bus: EventBus;
  private router: Router;
  private offlineMode: Offline;
  private onlineMode: Online;
  private rootNode: HTMLElement;

  /**
   * Creates an instance of Application.
   * @memberof Application
   */
  constructor(parentNode?: HTMLElement) {
    this.bus = eventBus;
    this.router = router;
    this.gameType = gameType.NONE;
    this.rootNode = parentNode || document.body;

    this.router.start();

    this.registerViews();

    this.bus.on(ScopesEnum.global, EventsEnum.connection_err, (data)=> {
      // TODO overlay error;
    });

    this.bus.on(ScopesEnum.global, EventsEnum.run_offline, (data) => {
      this.gameType = gameType.OFFLINE;
      if (!this.offlineMode) {
        this.offlineMode = new Offline(this.rootNode);
        return this.offlineMode.start();
      }
      return this.offlineMode.resume();
    });

    this.bus.on(ScopesEnum.global, EventsEnum.run_online, (data) => {
      this.gameType = gameType.ONLINE;

      if (!this.onlineMode) {
        this.onlineMode = new Online(this.rootNode);
        return this.onlineMode.start();
      }
      return this.onlineMode.resume();
    });

    this.bus.on(ScopesEnum.global, EventsEnum.exit_to_main_menu, (data) => {
      if (this.onlineMode) {
        this.onlineMode.pause();
      }
      if (this.offlineMode) {
        this.offlineMode.pause();
      }
      this.router.go('/');
    });

  }

  public start(): void {
    this.init();
  }

  stop() {
  }

  pause() {
  }

  resume() {
  }

  private async init(): Promise<void> {
    const location = window.location.pathname;

    if (location.startsWith(ViewPaths.online_game)) {
      let user;

      try {
        user = await userService.getUser(true);
      } catch (err) {
        Utils.debugWarn(err);
      }

      if (user) {
        if (location === ViewPaths.login ||
          location === ViewPaths.sign_up ||
          location === ViewPaths.online_game) {
          this.router.go(ViewPaths.online_lobby);
          return;
        }
      } else {
        if (location === ViewPaths.online_lobby ||
          location === ViewPaths.online_game) {
          this.router.go(ViewPaths.login);
          return;
        }
      }
    }

    this.router.go(location);
  }

  private registerViews() {
    this.router.register(Views.about.path, Views.about.class);
    this.router.register(Views.sign_up.path, Views.sign_up.class);
    this.router.register(Views.online_game.path, Views.online_game.class);
    this.router.register(Views.login.path, Views.login.class);
    this.router.register(Views.offline_game.path, Views.offline_game.class);
    this.router.register(Views.online_lobby.path, Views.online_lobby.class);
    this.router.register(Views.offline_lobby.path, Views.offline_lobby.class);
    this.router.register(Views.start.path, Views.start.class);
    this.router.register(Views.profile.path, Views.profile.class);
  }
}
