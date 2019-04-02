// test.js

import Vue from 'vue'
import VuePolling from '../src/main'
import assert from 'assert'

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

            v.$options.listeners['123'] = function() {}

            if (Object.keys(v.$options.listeners).length < 1) {
                assert.fail('still no listener')
            }
        })

        it('could add observer', function() {
            Vue.use(VuePolling)

            let v = new Vue({
                el: '#app'
            })

            v.$polling.addObserver('123', {})

            if (v.$polling.observers.size < 1) {
                assert.fail('still no observer')
            }

            v.$polling.clear()
        })
    })
})
