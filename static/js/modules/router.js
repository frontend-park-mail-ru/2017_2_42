class Router {
  /**
   * initializes router
   */
  constructor() {
    this.pathMap = new Map();
    this.controler = null;
  }

  /**
   * Register new controller
   * @param {string} path
   * @param {Controller} controller
   */
  register(path, controller) {
    this.pathMap[path] = controller;
  }

  /**
   * runs the controller on path
   * @param path
   */
  go(path) {
    if (this.pathMap[path]) {
      if (this.controller) {
        this.controller.stop();
      }
      this.controller = this.pathMap[path];
      this.controller.run();
    }
  }
}

export default new Router();
