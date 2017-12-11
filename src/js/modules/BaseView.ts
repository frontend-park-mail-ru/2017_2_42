import eventBus, {EventBus} from './eventBus';
import router, {Router} from './router';

export type BaseViewCtor = new (rootElement: HTMLElement, title: string) => BaseView;
export type ExtendedViewCtor = new (rootElement: HTMLElement) => BaseView;
/**
 * Implements the base view class
 * @export
 * @class BaseView
 */
export default abstract class BaseView {
  protected bus: EventBus;
  protected router: Router;
  protected eventBusDisablers: EventHandlerRemover[];

  /**
   * Creates an instance of BaseView.
   * @param {HTMLElement} rootElement root of the view.
   * @param {string} title title of the view
   */
  constructor(protected rootElement: HTMLElement, protected title: string) {
    this.router = router;
    this.bus = eventBus;
    this.eventBusDisablers = [];
  }

  /**
   * Inits the page for viewing
   * @abstract
   */
  public abstract async start(data?: any): Promise<void>;

  /**
   * Destroys the view
   * @abstract
   */
  public abstract async destroy(): Promise<void>;

  /**
   * Resumes view showing
   * @abstract
   */
  public abstract async resume(data?: any): Promise<void>;

  /**
   * Pauses view showing
   * @abstract
   */
  public abstract async pause(): Promise<void>;

  protected setTitle(newTitle?: string): void {
    document.title = newTitle || this.title;
  }

  protected removeAllBusListeners() {
    this.eventBusDisablers.forEach((remover: EventHandlerRemover) => {
      remover();
    });

    this.eventBusDisablers = [];
  }

  protected RenderPage(renderer: (data?: any) => string) {
    this.rootElement.innerHTML = renderer();
  }
}
