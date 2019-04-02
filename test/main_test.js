import Vue from 'vue'
import VuePolling from '../src/main.js'

const BaseURL = 'http://localhost/'

describe('Main', function() {
    describe('Basic works', function() {
        it('no $polling before Vue.use', function() {
            let v = new Vue({
                el: '#app'
            })

            if (!v) {
                assert.fail('vue instance is null')
            }

            if (v.$polling) {
                assert.fail('$polling is NOT null')
            }
        })

        it('could add listener', function() {
            Vue.use(VuePolling)

            let v = new Vue({
                el: '#app'
            })

            if (!v) {
                assert.fail('vue instance is null')
            }

            if (!v.$polling) {
                assert.fail('$polling is null')
            }

            let count = 0
            v.$options.listeners[BaseURL] = (resp) => {
                console.log(`#1 ${resp.data}`)
                count++
                if (count > 5) {
                    v.$polling.clear()
                }
            }

            if (Object.keys(v.$options.listeners).length < 1) {
                assert.fail('still no listener')
            }
        })

        it('could add observer', function() {
            Vue.use(VuePolling)

            let v = new Vue({
                el: '#app'
            })

            v.$polling.addObserver(BaseURL, {})

            if (v.$polling.observers.size < 1) {
                assert.fail('still no observer')
            }

            v.$polling.clear()
        })
    })
})
