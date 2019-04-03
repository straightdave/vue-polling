import Observer from '../src/observer.js'
import emitter from '../src/emitter.js'
import assert from 'assert'

const BaseURL = 'http://localhost/'

describe('Observer', () => {
    describe('#init', () => {
        it('should init', () => {
            let o = new Observer(BaseURL)
            if (!o) {
                assert.fail('failed to create')
            }

            let count = 0
            emitter.addListener(BaseURL, (resp) => {
                console.log(`#2 ${resp.data}`)
                count++
                if (count > 2) {
                    o.stop()
                    emitter.listeners.clear()
                    console.log('stopped')
                }
            })
        })
    })
})
