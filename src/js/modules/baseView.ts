import eventBus, { EventBus } from './eventBus';
import router, { Router } from './router';


/**
 * Implements the base view class
 *
 * @export
 * @class BaseView
 */
export default abstract class BaseView {
  protected pageSection: HTMLElement;
  protected rootElement: HTMLElement;
  protected bus: EventBus;
  protected router: Router;
  protected eventBusOFFers: EventHandlerRemover[];
  protected name: string;
  protected renderFunc: TemplateRenderFunc;

  /**
   * Creates an instance of BaseView.
   * @param {any} parentElement root of the view.
   * @memberof BaseView
   */
  constructor(parentElement: HTMLElement) {
    this.pageSection = document.createElement('section');

    this.rootElement = parentElement || document.body;
    this.rootElement.appendChild(this.pageSection);

    this.router = router;
    this.bus = eventBus;
    this.eventBusOFFers = [];
    this.pageSection = document.createElement('section');
  }

  /**
   * Inits the page for viewing
   *
   * @abstract
   * @memberof BaseView
   */
  public abstract start(data?: any): void;

  /**
   * Destroys the view
   *
   * @abstract
   * @memberof BaseView
   */
  public abstract destroy(): void;

  /**
   * Resumes view showing
   *
   * @abstract
   * @memberof BaseView
   */
  public abstract resume(data?: any): void;

  /**
   * Pauses view showing
   *
   * @abstract
   * @memberof BaseView
   */
  public abstract pause(): void;

  /**
   * Hides page
   *
   * @memberof BaseView
   */
  public hide(): void {
    this.pageSection.style.display = 'none';
  }

  /**
   * Shows page
   *
   * @memberof BaseView
   */
  public show(): void {
    this.pageSection.style.display = 'block';
  }
}
