import Emitter from '../src/emitter.js'
import assert from 'assert'

describe('Emitter', function() {
    describe('#new', function() {
        it('should be 0 before adding new listeners', function() {
            if (Emitter.listeners.size != 0) {
                assert.fail(`Emitter length = ${Emitter.listeners.length}, not zero`)
            }
        })

        it('could add new listener', function() {
            Emitter.addListener('123', (resp) => {
                console.log(resp)
            })
        })

        it('should be 1 after adding a new listener', function() {
            if (Emitter.listeners.size != 1) {
                assert.fail(`Emitter length = ${Emitter.listeners.length}, not 1`)
            }
        })
    })
})
