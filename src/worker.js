const { parentPort } = require('worker_threads')
const Nightmare = require('nightmare');

const nightmare = Nightmare({
    //   show: true
});

const WIDTH = 1920;
const HEIGHT = 1080;

parentPort.on('message', ({ name, at, id }) => {
    const pid = process.pid
    console.log(`${pid} got message: ${name}`);
    nightmare
        .viewport(WIDTH, HEIGHT)
        .goto(`file://${__dirname}/../resources/certificado.html?name=${name}&at=${at}`)
        .wait(500)
        .pdf(`${__dirname}/../output/${name}-${id}.pdf`, {
            pageSize: "A4",
            landscape: true,
        })
        .end()
        .then(() => process.send(`${pid} has finished`))
        .catch((error) => process.send(`${pid} has crashed: ${error.stack}`))
        .finally(_ => process.exit(0));
});
