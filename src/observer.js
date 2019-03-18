/* Dave Wu, 2019 */

import axios from 'axios'
import emitter from './emitter'

export default class {
    constructor(url, opts = {}) {
        this.url = url
        this.opts = opts
        this.start(url, opts)
    }

    start(url, opts = {}) {
        this.stop()
        this.timerID = setInterval(() => {
            axios.get(url)
            .then((resp) => {
                emitter.emit(url, resp)
            })
            .catch((error) => {
                console.log(error)
            })
        }, opts.interval || 5000)
    }

    stop() {
        if (this.timerID) {
            clearInterval(this.timerID)
            delete this.timerID
        }
    }
}
