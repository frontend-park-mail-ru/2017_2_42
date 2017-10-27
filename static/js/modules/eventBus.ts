import utils from './utils/utils';

/**
 * Class for global event bus handler
 *
 * @class EventBus
 */
export class EventBus {
  private bus: Map<string, Map<string, EventHandlerFunc[]>>;

  /**
   * Creates an instance of eventBus.
   * @memberof EventBus
   */
  constructor() {
    this.bus = new Map();
  }

  /**
   * Function that initializes event listener on event in scope
   *
   * @param {string} scope scope where event happens
   * @param {string} event event to handle
   * @param {EventHandlerFunc} callback event hanler function
   * @memberof eventBus
   */
  on(scope: string, event: string, callback: EventHandlerFunc): EventHandlerRemover {
    if (!this.bus[scope]) {
      this.bus[scope] = new Map();
    }

    if (!this.bus[scope][event]) {
      this.bus[scope][event] = [];
    }

    this.bus[scope][event].push(callback);
    return () => this.off(scope, event, callback);
  }

  /**
   * Function that turns off the handler on event in scope
   *
   * @param {string} scope scope where event happens
   * @param {string} event event to handle
   * @param {EventHandlerFunc} callback event handler function
   * @memberof EventBus
   */
  off(scope: string, event: string, callback: EventHandlerFunc): void {
    if (!this.bus[scope]) {
      return utils.debugWarn(`Scope ${scope} doesn't exist`);
    }

    if (!this.bus[scope][event]) {
      return utils.debugWarn(`Handlers on event ${event} don't exist.`);
    }

    this.bus[scope][event] = this.bus[scope][event].filter(
      (handler) => handler !== callback);

    if (this.bus[scope][event].length === 0) {
      this.bus[scope].delete(event);
    }
  }

  /**
   * Function that emits the event listeners for event
   * @param {string} scope scope where event happens
   * @param {string} event event to handle
   * @param {object} [data] handler data
   * @returns
   * @memberof EventBus
   */
  emit(scope: string, event: string, data?: object): any {
    if (this.bus[scope] && this.bus[scope][event]) {
      this.bus[scope][event].forEach((callback) => callback(data));
    }
  }

  /**
   * Makes event happen only once
   *
   * @param {string} scope scope where event happens
   * @param {string} event event to handle
   * @param {EventHandlerFunc} callback event handler function
   * @returns {EventHandlerRemover}
   * @memberof EventBus
   */
  singleOn(scope: string, event: string, callback: EventHandlerFunc): EventHandlerRemover {
    const handler = (data) => {
      callback(data);
      this.off(scope, event, handler);
    };

    return this.on(scope, event, handler);
  }
}

export enum ScopesEnum {
  global = 'global',
  auth = 'auth',
  offline = 'offline',
  online = 'online',
}

export enum EventsEnum {
  start_singleplayer = 'start_singleplayer',
  start_multiplayer = 'start_multiplayer',
  exit_to_main_menu = 'exit_to_main_menu',
  map_chosen = 'map_chosen',
  user_signed_up = 'user_signed_up',
  user_logged_in = 'user_logged_in',
  run_online = 'run_online',
  run_offline = 'run_offline',
  map_ready = 'map_ready',
}

const eventBus = new EventBus();

export default eventBus;
