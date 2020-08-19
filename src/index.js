
const moduleName = `${__dirname}/worker.js`
const { Worker } = require('worker_threads')

const data = require('../resources/data.json')
async function run() {
    let count = 0
    for (const item of data) {
        item.id = count++
        const worker = new Worker(moduleName)
        worker.on('message', msg => console.log(msg))
        worker.on('error', console.error)
        worker.postMessage(item)
    }
}

run()