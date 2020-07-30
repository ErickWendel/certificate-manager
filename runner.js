const Nightmare = require('nightmare');

const nightmare = Nightmare({
    //   show: true
});

const WIDTH = 1920;
const HEIGHT = 1080;

process.on('message', ({ name, at }) => {
    const pid = process.pid
    console.log(`${pid} got message: ${name}`);
    nightmare
        .viewport(WIDTH, HEIGHT)
        .goto(`file://${__dirname}/resources/certificado.html?name=${name}&at=${at}`)
        .wait(500)
        .pdf(`${__dirname}/output/${name}.pdf`, {
            pageSize: "A4",
            landscape: true,
        })
        .end()
        .then(function () {
            process.send(`${pid} has finished`)
        })
        .catch(function (error) {
            process.send(`${pid} has crashed: ${error.stack}`)
        }).finally(_ => {
            process.exit(0)
        });

});