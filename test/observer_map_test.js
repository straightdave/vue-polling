import observerMap from '../src/observer_map.js'

const BaseURL = 'http://localhost/'

describe('observerMap', function() {
    describe('#init', function() {
        it('should be non-null', function() {
            if (!observerMap) {
                assert.fail('Oops! blank object')
            }
        })
    })

    describe('#add', function() {
        it('should add one observer', function() {
            let o2 = observerMap.add(BaseURL, {
                headers: { 'Content-Type': 'text/html' }
            })

            if (observerMap.observers.size != 1) {
                assert.fail(`observers not right`)
            }

            observerMap.clear()
        })
    })
})
