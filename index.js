const cp = require('child_process')
const moduleName = `${__dirname}/index.js`

const data = require('./resources/data.json')
function run() {
    
    for (file of data) { 
        const process = cp.fork(moduleName, [])
        process.send(file);
        process.on('message', msg => console.log(msg))
    }
}

run()