/* Dave Wu, 2019 */

class Emitter {
    constructor() {
        // map key:   API url
        // map value: list of {callback, vm}
        this.listeners = new Map()
    }

    // Append a callback to the callback list for one url
    // url:      the backend API url
    // callback: the callback
    // vm:       the vue component instance
    addListener(url, callback, vm) {
        if (typeof callback === 'function') {
            const label = url.trim()
            this.listeners.has(label) || this.listeners.set(label, [])
            this.listeners.get(label).push({
                callback: callback,
                vm: vm
            })
            return
        }
        throw new Error('[vue-polling] callback not a function')
    }

    removeListener(url, callback, vm) {
        const label = url.trim()

        if (!callback) {
            // if no specific callback to remove,
            // remove whole callback list for the url.
            this.listeners.delete(label)
            return
        }

        let listeners = this.listeners.get(label)
        let index

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                if (typeof listener.callback === 'function' &&
                    listener.callback === callback &&
                    listener.vm === vm) {
                    i = index
                }
                return i
            }, -1)

            if (index > -1) {
                listeners.splice(index, 1)
                this.listeners.set(label, listeners)
            }
        }
    }

    emit(label, ...args) {
        let listeners = this.listeners.get(label)

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener.callback.call(listener.vm, ...args)
            })
        }
    }
}

export default new Emitter()
