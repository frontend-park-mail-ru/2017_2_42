/**
 * Базовый класс блока
 * @module Block
 */
export class Block {
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
   * Фабричный метод, который ползволяет удобро
   * создавать блоки с заданными характеристиками
   * @param {string} [tagName='div'] - tagName блока
   * @param {*} [attrs={}] - объект с атрибутами блока
   * @param {string[]} [classes=[]] - список имён классов
   * @return {Block}
   * @constructor
   */
  static create(tagName = 'div', attrs = {}, classes = []) {
    const elem = document.createElement(tagName);

    classes.forEach(function(className) {
      elem.classList.add(className);
    });

    Object.keys(attrs).forEach((name) => {
      elem.setAttribute(name, attrs[name]);
    });

    return new Block(elem);
  }

  /**
   * Скрывает блок
   */
  hide() {
    for (let remover of this.listenerRemovers) {
      remover();
    }
    this.elem.style.display = 'none';
  }

  /**
   * Отображает блок
   */
  show() {
    this.elem.style.display = 'block';
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
   * Позволяет подписаться на событие
   * @param {string} event
   * @param {Function} callback
   */
  on(event, callback) {
    this.elem.addEventListener(event, callback);

    this.listenerRemovers.push(() => {
      this.elem.removeEventListener(event, callback);
    });
  }
}
