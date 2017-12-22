/**
 * Base class for block implementations
 *
 */
export default class Block {
  private childArray: Block[];
  private listenerRemovers: EventHandlerRemover[];

  /**
   * Creates an instance of Block.
   * @param {HTMLElement} element this element becomes the block
   * @memberof Block
   */
  constructor(protected element: HTMLElement) {
    this.childArray = [];
    this.listenerRemovers = [];
  }

  /**
   * Appends a child block to this
   *
   * @param {Block} childBlock child to append
   * @memberof Block
   */
  public append(childBlock: Block) {
    this.childArray.push(childBlock);
    this.element.appendChild(childBlock.element);
  }

  /**
   * Adds event listener on block
   *
   * @param {string} event event to listen
   * @param {EventListener} callback event handler
   * @returns {ListenerRemover} function that will remove event listener
   * @memberof Block
   */
  public on(event: string, callback: EventListener): ListenerRemover {
    this.element.addEventListener(event, callback);

    const remover: ListenerRemover = () => {
      return this.element.removeEventListener(event, callback);
    };

    this.listenerRemovers.push(remover);

    return remover;
  }

  /**
   * Function that clears listeners on this block
   *
   * @memberof Block
   */
  public clearListeners(): void {
    this.listenerRemovers.forEach((remover) => remover());
  }

  /**
   * Shows the element
   *
   * @memberof Block
   */
  public show(): void {
    this.element.style.display = 'block';
  }

  /**
   * Hides the element
   *
   * @memberof Block
   */
  public hide(): void {
    this.element.style.display = 'none';
  }
}

