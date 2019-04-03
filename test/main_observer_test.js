import Vue from 'vue'
import VuePolling from '../src/main.js'
import om from '../src/observer_map.js'
import assert from 'assert'
Vue.use(VuePolling)

const BaseURL = 'http://localhost/'

describe('Basic with observer', () => {
    it('$polling should exist', () => {
        const vm = new Vue({
            template: '<div>dummy</div>'
        })

        if (!vm.$polling) {
            assert.fail('Oops, no $polling')
        }
    })

    it('could use $polling to add, get & delete observers', () => {
        const vm = new Vue({
            template: '<div>dummy</div>',
            created() {
                this.$polling.addObserver(BaseURL)
                this.$options.listeners[BaseURL] = (resp) => {
                    console.log(`#3 ${resp.data}`)
                }
            },
            beforeDestroy() {
                console.log('#3 before destroy')
                this.$polling.removeObserver(BaseURL)
            }
        }).$mount()

        if (om.observers.size != 1) {
            assert.fail(`Oops size = ${om.observers.size}, not 1`)
        }

        setTimeout(() => {
            vm.$destroy()

            if (om.observers.size != 0) {
                assert.fail(`Oops size = ${om.observers.size}, not 0`)
            }
        }, 5000)
    })
})
