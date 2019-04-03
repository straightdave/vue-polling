import Vue from 'vue'
import VuePolling from '../src/main.js'
import emitter from '../src/emitter.js'
import assert from 'assert'
Vue.use(VuePolling)

const BaseURL = 'http://localhost/'

describe('Main', () => {
    describe('Basic works', () => {
        it('could add & delete listeners via $options', () => {
            console.log(`listeners: ${emitter.listeners.size}`)

            const vm = new Vue({
                template: '<div>dummy</div>',
                created() {
                    console.log('#1 vm is created')
                    this.$options.listeners[BaseURL] = (resp) => {
                        console.log(`#1 ${resp.data}`)
                    }
                    console.log(`listeners: ${emitter.listeners.size}`)
                },
                beforeDestroy() {
                    console.log('#1 before destroy')
                    delete this.$options.listeners[BaseURL]
                },
                destroyed() {
                    console.log('#1 vm destroyed')
                    console.log(`listeners: ${emitter.listeners.size}`)
                }
            }).$mount()

            if (emitter.listeners.size == 0) {
                assert.fail('still no listener')
            }

            vm.$destroy()
        })

        it('listeners should work as expected for multiple components', () => {
            const vm1 = new Vue({
                template: '<div>dummy1</div>',
                created() {
                    this.$options.listeners[BaseURL] = () => {
                        console.log('#01 created')
                    }
                },
                beforeDestroy() {
                    delete this.$options.listeners[BaseURL]
                }
            }).$mount()

            const vm2 = new Vue({
                template: '<div>dummy2</div>',
                created() {
                    this.$options.listeners[BaseURL] = () => {
                        console.log('#02 created')
                    }
                },
                beforeDestroy() {
                    delete this.$options.listeners[BaseURL]
                }
            }).$mount()

            if (emitter.listeners.size != 1) {
                assert.fail('same url should have only one listener')
            }

            if (emitter.listeners.get(BaseURL).length != 2) {
                assert.fail('should have two callbacks')
            }

            vm1.$destroy()

            if (!emitter.listeners.has(BaseURL)) {
                assert.fail('should have such url key')
            }

            if (emitter.listeners.get(BaseURL).length != 1) {
                assert.fail('should have one callback left')
            }

            vm2.$destroy()

            if (emitter.listeners.has(BaseURL)) {
                assert.fail('should not have such url key')
            }
        })
    })
})
