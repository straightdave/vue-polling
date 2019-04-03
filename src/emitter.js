/* Dave Wu, 2019 */

class Emitter {
    constructor() {
        // map key:   API url
        // map value: [{cb, vm}, {cb, vm}, ...]
        this.listeners = new Map()
    }

    // Append a callback to the callback list for one url
    // url:      the backend API url
    // callback: the callback func
    // vm:       the vue instance
    addListener(url, callback, vm) {
        if (typeof callback === 'function') {
            const label = url.trim()
            this.listeners.has(label) || this.listeners.set(label, [])
            this.listeners.get(label).push({
                cb: callback,
                vm: vm
            })
            return
        }
        throw new Error('[vue-polling] callback not a function')
    }

    removeListener(url, vm) {
        const label = url.trim()

        if (!vm) {
            // if vm is not specified, remove the whole key
            this.listeners.delete(label)
            return
        }

        let callbacks = this.listeners.get(label)

        if (callbacks && callbacks.length) {
            const cbNotInThisVM = callbacks.filter(callback => callback.vm !== vm)

            if (cbNotInThisVM.length == 0) {
                // if no callbacks remained (that is, all callbacks
                // for such url are defined in this vm),
                // remove the whole key
                this.listeners.delete(label)
                return
            }

            this.listeners.set(label, cbNotInThisVM)
        }
    }

    emit(label, ...args) {
        let listeners = this.listeners.get(label)

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener.cb.call(listener.vm, ...args)
            })
        }
    }
}

export default new Emitter()
