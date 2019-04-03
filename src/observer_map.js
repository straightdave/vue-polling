/* Dave Wu, 2019 */

import Observer from './observer.js'

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
            let oo = this.observers.get(k)
            oo && oo.stop()
        }
        let o = new Observer(k, opts)
        this.observers.set(k, o)
        return o
    }

    remove(url) {
        const k = url.trim()
        if (this.observers.has(k)) {
            let oo = this.observers.get(k)
            oo && oo.stop()
        }
        this.observers.delete(k)
    }

    clear() {
        this.observers.forEach((v) => {
            v.stop()
        })
        this.observers.clear()
    }
}

export default new ObserverMap()
