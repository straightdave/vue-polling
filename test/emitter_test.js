import emitter from '../src/emitter.js'
import assert from 'assert'

const BaseURL = 'http://localhost/'

describe('emitter', () => {
    describe('#new', () => {
        it('should be 0 before adding new listeners', () => {
            emitter.removeListener(BaseURL)
            if (emitter.listeners.size != 0) {
                assert.fail(`emitter length = ${emitter.listeners.size}, not zero`)
            }
        })

        it('could add new listener', () => {
            emitter.addListener(BaseURL, (resp) => {
                console.log(resp)
            })
        })

        it('should be 1 after adding a new listener', () => {
            if (emitter.listeners.size != 1) {
                assert.fail(`emitter length = ${emitter.listeners.size}, not 1`)
            }
        })

        it('should be 0 after removing listeners', () => {
            emitter.removeListener(BaseURL)

            emitter.listeners.forEach((v, k) => {
                console.log(`key=${k}, value=${v}`)
            })

            if (emitter.listeners.size != 0) {
                assert.fail(`emitter size = ${emitter.listeners.size}, not zero`)
            }
        })
    })
})
