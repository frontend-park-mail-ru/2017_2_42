import BaseView from './baseView';
import Utils from './utils/utils';

/**
 * View node in route map
 *
 * @interface ViewInfo
 */
interface ViewInfo {
  ViewClass: new (parentElement: HTMLElement) => BaseView;
  view: BaseView;
}

/**
 * Router class for navigation
 *
 * @export
 * @class Router
 */
export class Router {
  private routes: Map<string, ViewInfo>;
  private rootElement: HTMLElement;
  private currentView: BaseView;

  /**
   * Creates an instance of Router.
   * @param {HTMLElement} [rootElement]
   * @memberof Router
   */
  constructor(rootElement?: HTMLElement) {
    this.routes = new Map();
    this.rootElement = rootElement || document.body;
  }

  register(path: string, view: new (parentElement: HTMLElement) => BaseView): void {
    this.routes[path] = {ViewClass: view};
  }

  /**
   * Inits the router.
   *
   * @memberof Router
   */
  start(): void {
    window.onpopstate = (event) => this.go(window.location.pathname);
  }

  /**
   * Method for changing view.
   *
   * @param {string} path url to go
   * @returns {void}
   * @memberof Router
   */
  go(path: string): void {
    const info = this.routes[path];
    if (!info) {
      Utils.debugWarn(`There is no view on path ${path}`);
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    if (this.currentView) {
      this.currentView.pause();
    }

    if (info.view) {
      info.view.resume();
    } else {
      this.routes[path].view = new info.ViewClass(this.rootElement);
      info.view.start();
    }

    this.currentView = info.view;
  }
}

export default new Router();
