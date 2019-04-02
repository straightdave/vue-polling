/* Dave Wu, 2019 */

import axios from 'axios'
import emitter from './emitter.js'

export default class {
    constructor(url, opts = {}) {
        this.start(url, opts)
    }

    start(url, opts = {}) {
        let itvl = opts.interval || 2000
        let maxf = opts.maxFails || 5

        this.stop()

        let failures = 0
        this.timerID = setInterval(() => {
            axios({
                method: 'get',
                url: url,
                headers: opts.headers
            })
            .then((resp) => {
                failures = 0
                emitter.emit(url, resp)
            })
            .catch((error) => {
                failures++
                console.log(error)
                if (failures >= maxf) {
                    console.log("exceeding max continuous failure times")
                    this.stop()
                }
            })
        }, itvl)
    }

    stop() {
        if (this.timerID) {
            clearInterval(this.timerID)
            delete this.timerID
        }
    }
}
