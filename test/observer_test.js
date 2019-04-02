import Observer from '../src/observer.js'
import Emitter from '../src/emitter.js'

const BaseURL = 'http://localhost/'

describe('Observer', function() {
    describe('#init', function() {
        it('should init', function() {
            let o = new Observer(BaseURL)
            if (!o) {
                assert.fail('failed to create')
            }

            let count = 0
            Emitter.addListener(BaseURL, (resp) => {
                console.log(`#2 ${resp.data}`)
                count++
                if (count > 5) {
                    o.stop()
                }
            })
        })
    })
})
