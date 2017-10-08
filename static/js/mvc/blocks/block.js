/**
 * Базовый класс блока
 * @module Block
 */
export default class Block {
  /**
   * @param {HTMLElement} el - корневой элемент блока
   * @constructor
   */
  constructor(el) {
    this.elem = el;
    this.childArr = [];
    this.listenerRemovers = [];
  }

  /**
   * Добавляет к текущему блоку дочерний
   * @param {Block} block
   */
  append(block) {
    this.childArr.push(block);
    this.elem.appendChild(block.elem);
  }

  /**
   * Event handler
   * @param event
   * @param callback
   */
  on(event, callback) {
    this.elem.addEventListener(event, callback);

    const remover = () => {
      this.elem.removeEventListener(event, callback);
    };
    this.listenerRemovers.push(remover);

    return remover;
  }


  /**
   * Function that deletes all listeners from element
   */
  clearListeners() {
    this.listenerRemovers.forEach(remover => remover());
  }
}
