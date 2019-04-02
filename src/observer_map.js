/* Dave Wu, 2019 */

import Observer from './observer'

class ObserverMap {
    constructor() {
        this.observers = new Map()
    }

    getOne(url) {
        return this.observers.get(url.trim())
    }

    getAll() {
        return this.observers
    }

    add(url, opts = {}) {
        let k = url.trim()
        if (this.observers.has(k)) {
            this.observers.get(k).stop()
        }
        this.observers.set(k, new Observer(k, opts))
    }

    remove(url) {
        const k = url.trim()
        this.observers.get(k).stop()
        this.observers.delete(k)
    }

    clear() {
        this.observers.forEach((v) => {
            v.stop()
        })
        delete this.observers
    }
}

export default new ObserverMap()
