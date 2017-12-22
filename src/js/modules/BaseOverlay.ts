import bus, {EventBus} from './eventBus';
import router, {Router} from './router';

export type BaseOverlayCtor = new (rootElement: HTMLElement) => BaseOverlay;

export default abstract class BaseOverlay {
  private bus: EventBus;
  private router: Router;

  constructor(protected rootElement: HTMLElement) {
    this.bus = bus;
    this.router = router;

    document.querySelector('#overlay-bg')
      .addEventListener('click', () => this.router.HideAllOverlays());
  }

  public async abstract start(data?: any): Promise<void>;

  public async abstract stop(): Promise<void>;

  public show(data?: any): void {
    this.rootElement.style.display = 'flex';
  }

  public hide(): void {
    this.rootElement.style.display = 'none';
  }
  protected RenderOverlay(renderer: (data?: any) => string) {
        this.rootElement.innerHTML = renderer();
    }
}