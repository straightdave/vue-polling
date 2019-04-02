// observer_map_test.js

import ObserverMap from '../src/observer_map'

describe('ObserverMap', function() {
    describe('#init', function() {
        it('should be non-null', function() {
            if (!ObserverMap) {
                assert.fail('Oops! blank object')
            }
        })
    })

    describe('#add', function() {
        it('should add one observer', function() {
            let o1 = ObserverMap.add('123', {})

            let o2 = ObserverMap.add('456', {
                headers: { 'Content-Type': 'application/json' }
            })

            if (ObserverMap.observers.size != 2) {
                assert.fail(`observers not right`)
            }

            ObserverMap.clear()
        })
    })
})
