/**
 * Implements the controller class
 */
export default class Controller {
  /**
   * Builds the controller
   */
  constructor() {
    this.view = null;
    this.model = null;
    this.evBusListenerRemovers = [];
  }

  run() {
    this.view.show();
    this.model.run();
  }

  stop() {
    this.view.hide();
    this.evBusListenerRemovers.forEach(rm => rm());
    this.model.stop();
  }
}
