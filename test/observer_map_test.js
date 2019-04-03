import observerMap from '../src/observer_map.js'
import assert from 'assert'

const BaseURL = 'http://localhost/'

describe('observerMap', () => {
    describe('#init', () => {
        it('should be non-null', () => {
            if (!observerMap) {
                assert.fail('Oops! blank object')
            }
        })
    })

    describe('#add', () => {
        it('should add one observer', () => {
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
