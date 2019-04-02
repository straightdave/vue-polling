/* Dave Wu, 2019 */

import Observer from './observer'

class ObserverMap {
    constructor() {
        this.observers = new Map()
    }

    add(url, opts = {}) {
        let k = url.trim()
        if (this.observers.has(k)) {
            this.observers.get(k).stop()
        }
        this.observers.set(k, new Observer(k, opts))
    }

    remove(url) {
        const key = url.trim()
        this.observers.get(key).stop()
        this.observers.delete(key)
    }

    clear() {
        this.observers.forEach((v) => {
            v.stop()
        })
        delete this.observers
    }
}

export default new ObserverMap()
