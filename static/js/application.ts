import eventBus, {EventBus, EventsEnum, ScopesEnum} from './modules/eventBus';
import router, {Router} from './modules/router';
import Offline from './offline/offline';
import Online from './online/online';

import AboutView from './views/aboutView/aboutView';
import StartView from './views/startView/startView';

const gameType = {
  OFFLINE: 'singleplayer',
  ONLINE: 'multiplayer',
  NONE: 'none',
};

/**
 * Main class for web application.
 *
 * @class Application
 */
export default class Application implements App {
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

    this.router.register('/', StartView);
    this.router.register('/about', AboutView);

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

  start() {
    this.router.go('/');
  }

  stop() {
  }

  pause() {
  }

  resume() {
  }
}

export interface App {
  start(): void;

  stop(): void;

  pause(): void;

  resume(): void;
}

