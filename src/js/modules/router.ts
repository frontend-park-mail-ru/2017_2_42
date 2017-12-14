import BaseOverlay, {BaseOverlayCtor} from './BaseOverlay';
import BaseView, {BaseViewCtor} from './BaseView';
import Utils from './utils/utils';

/**
 * View node in route map
 *
 * @interface ViewPageInfo
 */
interface ViewInfo {
  ViewClass: BaseViewCtor;
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
  private overlays: Map<string, BaseOverlayCtor>;

  private rootElement: HTMLElement;
  private mainFrameSection: HTMLElement;
  private overlaySection: HTMLElement;
  private currentView: BaseView;

  private openedOverlayList: BaseOverlay[];

  /**
   * Creates an instance of Router.
   * @param {HTMLElement} [rootElement]
   */
  constructor(rootElement?: HTMLElement) {
    this.routes = new Map();
    this.overlays = new Map();
    this.rootElement = rootElement || document.body;

    this.mainFrameSection = document.createElement('section');
    this.overlaySection = document.createElement('section');

    this.mainFrameSection.id = 'main-frame';
    this.overlaySection.id = 'overlays';

    this.rootElement.appendChild(this.mainFrameSection);
    this.rootElement.appendChild(this.overlaySection);

    this.openedOverlayList = [];
  }

  public setRootElement(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  register(path: string, view: BaseViewCtor): void {
    this.routes[path] = {ViewClass: view};
  }

  registerOverlay(name: string, overlay: BaseOverlayCtor): void {
    this.overlays[name] = overlay;
  }

  registerNotFoundView(view: BaseViewCtor): void {
    this.notFoundView = new view(this.mainFrameSection as HTMLElement, 'Not found');
  }

  /**
   * Initializes the router.
   */
  start(): void {
    window.onpopstate = () => this.go(window.location.pathname);
  }

  /**
   * Method for changing the view
   * @param {string} path
   * @param data
   */
  go(path: string, data?: any): void {
    this.HideAllOverlays();
    const info = this.routes[path];
    if (!info) {
      Utils.debugWarn(`There is no view on path ${path}`);
      this.goNotFound();
      return;
    }

    if (window.location.pathname !== path) {
      // window.history.pushState({}, '', path);
    }

    if (this.currentView) {
      this.currentView.pause();
    }

    if (info.view) {
      info.view.resume(data);
    } else {
      this.routes[path].view = new info.ViewClass(this.mainFrameSection);
      info.view.start(data);
    }

    this.currentView = info.view;
  }

  public showOverlay(name: string, data?: any): void {
    const overlayCtor = this.overlays[name];
    if (!overlayCtor) {
      Utils.debugWarn('no overlay found');
      return;
    }

    const newOverlaySection = document.createElement('section');
    this.overlaySection.appendChild(newOverlaySection);
    if (this.openedOverlayList.length !== 0) {
      this.openedOverlayList[this.openedOverlayList.length - 1].hide();
    }

    const ol: BaseOverlay = new overlayCtor(newOverlaySection);
    this.openedOverlayList.push(ol);
    ol.start(data);

    if (this.openedOverlayList.length === 1) {
      this.overlaySection.style.display = 'flex';
    }
  }

  public HideOverlay(): void {
    const overlay = this.openedOverlayList.pop();

    if (overlay) {
      overlay.stop();
      this.overlaySection
        .removeChild(
          this.overlaySection.children[this.overlaySection.children.length - 1]);
    }

    if (this.openedOverlayList.length !== 0) {
      this.openedOverlayList[this.openedOverlayList.length - 1].show();
    } else {
      this.overlaySection.style.display = 'none';
    }
  }

  public HideAllOverlays(): void {
    this.openedOverlayList.forEach((ol) => ol.stop());
    this.openedOverlayList = [];
    this.overlaySection.innerHTML = '';
    this.overlaySection.style.display = 'none';
  }

  /**
   * Goes to not found page
   */
  private goNotFound() {
    //window.history.pushState({}, '', window.location.pathname);

    if (this.currentView) {
      this.currentView.pause();
    }

    if (this.notFoundView) {
      this.currentView = this.notFoundView;

      this.notFoundView.start();
    } else {
      document.body.innerText = '404 not found';
    }
  }

  private notFoundView: BaseView;
}

export default new Router(document.body);
