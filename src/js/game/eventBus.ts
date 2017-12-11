/**
 * Created by zwirec on 24.10.17.
 */

interface eventHandlerFunc {
    (data?: object): void;
}

interface eventHandlerRemover {
    (): void;
}

/**
 * Class for global event bus handler
 *
 * @class EventBus
 */
class EventBus {
    /**
     * Creates an instance of eventBus.
     * @memberof EventBus
     */
    constructor() {
        this.bus = new Map();
    }

    /**
     * Function that initializes event listener on event in scope
     *
     * @param {string} scope scope where event occures
     * @param {string} event event to handle
     * @param {eventHandlerFunc} callback event hanler function
     * @param {boolean} [force] true if you want to override event listener
     * @memberof eventBus
     */
    on(scope: string, event: string, callback: eventHandlerFunc, force?: boolean): eventHandlerRemover {
        if (!this.bus[scope]) {
            this.bus[scope] = new Map();
        }

        if (this.bus[scope][event]) {
            if (force) {
                this.bus[scope][event] = callback;
                return () => this.off(scope, event, callback);
            }

            throw `Event ${event} in scope ${scope} already exists`;
        }

        this.bus[scope][event] = callback;
    }

    /**
     * Function that turns off the handler on event in scope
     *
     * @param {string} scope scope where event occures
     * @param {string} event event to handle
     * @param {eventHandlerFunc} callback event handler function
     * @memberof EventBus
     */
    off(scope: string, event: string, callback: eventHandlerFunc): void {
        if (!this.bus[scope] || !this.bus[scope][event]) {
            throw `Event ${event} in scope ${scope} doesn't exist`;
        }

        return this.bus[scope].delete(event);
    }

    /**
     * Function that emits the event listeners for event
     *
     * @param {string} scope scope where event occures
     * @param {string} event event to handle
     * @param {object} [data] handler data
     * @returns
     * @memberof EventBus
     */
    emit(scope: string, event: string, data?: object) {
        if (!this.bus[scope] || !this.bus[scope][event]) {
            return Promise.reject(`No functions for event ${event} in scope ${scope}`);
        }

        return this.bus[scope][event](data);
    }

    /**
     * Delete all hanlers for scope
     *
     * @param {string} scope scope to exit from
     * @memberof EventBus
     */
    exitScope(scope: string) {
        if (!this.bus[scope]) {
            throw `Scope ${scope} doesn't exist`;
        }

        return this.bus.delete(scope);
    }

    private bus: Map<string, Map<string, eventHandlerFunc>>;
}

const eventBus = new EventBus();

export default eventBus;