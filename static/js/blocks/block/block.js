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
        this._elem = el;
    }

    /**
     * Фабричный метод, который ползволяет удобро создавать блоки с заданными характеристиками
     * @param {string} [tagName='div'] - tagName блока
     * @param {*} [attrs={}] - объект с атрибутами блока
     * @param {string[]} [classes=[]] - список имён классов
     * @param {string|null} [text=null] - опциональный текст блока
     * @return {Block}
     * @constructor
     */
    static Create(tagName = 'div', attrs = {}, classes = [], text = null) {
        const elem = document.createElement(tagName);
        classes.forEach(function (className) {
            elem.classList.add(className);
        });
        for (let name in attrs) {
            elem.setAttribute(name, attrs[name]);
        }
        if (text) {
            elem.textContent = text;
        }
        this.ready = false;
        return new Block(elem);
    }

    /**
     * Установить новый текст для блока
     * @param {string} text
     */
    setText(text) {
        this._elem.textContent = text;
    }

    /**
     * Очищает содержимое блока
     */
    clear() {
        this._elem.innerHTML = '';
    }

    /**
     * Скрывает блок
     */
    hide() {
        this._elem.style.display = 'none';
    }

    /**
     * Отображает блок
     */
    show() {
        this._elem.style.display = 'inherit';
    }

    /**
     * Добавляет к текущему блоку дочерний
     * @param {Block} block
     * @return {Block}
     */
    append(block) {
        this._elem.appendChild(block._elem);
        return this;
    }

    /**
     * Позволяет подписаться на событие
     * @param {string} event
     * @param {EventListener} callback
     * @return {function(this:Block)} - функция отписки от события
     */
    on(event, callback) {
        this._elem.addEventListener(event, callback);
        return function () {
            this._elem.removeEventListener(event, callback);
        }.bind(this);
    }
}