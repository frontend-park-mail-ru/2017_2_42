/**
 * Class of event handlers
 */
class EventBus {
  /**
   * initializes event bus
   */
  constructor() {
    this.eventsMap = new Map();
  }

  /**
   * Function that adds handler on event
   * @param {string} event event to handle
   * @param {function} callback event handler
   * @return {function} handler remover
   */
  on(event, callback) {
    if (!this.eventsMap[event]) {
      this.eventsMap[event] = [callback];
    } else {
      this.eventsMap[event].push(callback);
    }

    return () => this.off(event, callback);
  }

  /**
   * Function that deletes event handler
   * @param {string} event event which handler is going to be deleted
   * @param {function} callback handler to be deleted
   */
  off(event, callback) {
    if (!this.eventsMap[event]) {
      return;
    }

    if (this.eventsMap[event].length === 1) {
      if (this.eventsMap[event][0] === callback) {
        this.eventsMap.delete(event);
      }
    } else {
      this.eventsMap[event].filter(handler => handler !== callback);
    }
  }

  /**
   * Function that emits event
   * @param {string} event event to handle
   * @param {Object} data callback argument
   */
  emit(event, data) {
    if (this.eventsMap[event]) {
      this.eventsMap[event].forEach(callback => callback(data));
    }
  }

  /**
   * Function that handles event once
   * @param {string} event event to handle
   * @param {Function} callback event handler
   * @return {Function} handler remover
   */
  disposableOn(event, callback) {
    const handler = data => {
      callback(data);
      this.off(event, handler);
    };

    return this.on(event, handler);
  }
}

export default new EventBus();
