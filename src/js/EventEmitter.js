

export default class EventEmitter {
    constructor() {
        this.eventMap = {};
    }

    subscribe(event, fn) {
        if (!this.eventMap.hasOwnProperty(event)) {
            this.eventMap[event] = new Set();
        }
        this.eventMap[event].add(fn);

        return {
            unsubscribe: () => {
                this.eventMap[event].delete(fn);
            }
        };
    }

    emit(event, args=[]) {
        const res = [];
        (this.eventMap[event] ?? []).forEach((fn) => {
            res.push(fn(...args));
        })
        return res;
    }
}