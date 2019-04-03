/* Dave Wu, 2019 */

import observerMap from './observer_map.js'
import emitter from './emitter.js'

const supportProxy = typeof Proxy !== 'undefined' &&
                     typeof Proxy === 'function' &&
                     /native code/.test(Proxy.toString())

export default {
    install(Vue) {
        Vue.prototype.$polling = {
            observers:   observerMap,

            // shortcuts
            addObserver:    observerMap.add.bind(observerMap),
            removeObserver: observerMap.remove.bind(observerMap),
            clear:          observerMap.clear.bind(observerMap),
            getOne:         observerMap.getOne.bind(observerMap),
            getAll:         observerMap.getAll.bind(observerMap)
        }

        Vue.mixin({
            created() {
                let vm = this

                // in case there's 'listeners' defined and used by others
                let listeners = this.$options['listeners']

                if (supportProxy) {
                    this.$options.listeners = new Proxy({}, {
                        set(target, prop, value) {
                            // pushing a callback (value here) into the list
                            // of callbacks for the url (prop here)
                            emitter.addListener(prop, value, vm)
                            // target object is used as storage of callbacks
                            // TODO: one problem here:
                            // target is in a key-value pattern, only one callback
                            // could be stored by one url
                            target[prop] = value
                            return true
                        },

                        deleteProperty(target, prop) {
                            emitter.removeListener(prop, vm)
                            delete target.prop
                            return true
                        }
                    })

                    // restore those 'listeners' defined by others
                    if (listeners) {
                        Object.keys(listeners).forEach((key) => {
                            this.$options.listeners[key] = listeners[key]
                        })
                    }
                } else {
                    Object.seal(this.$options.listeners)
                    if (listeners) {
                        Object.keys(listeners).forEach((key) => {
                            emitter.addListener(key, listeners[key], vm)
                        })
                    }
                }
            }
        })
    }
}
