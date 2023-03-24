import * as fs from 'node:fs'
import * as http from 'http'
import * as kleur from 'kleur'

fs.readFile("./qrk.json", (err, dat)=>{
    if (err) {
        cerr(err.message)
        process.exit(1)
    }
    const servep = JSON.parse(dat.toString('utf-8'))
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('Hello, World!\n');
    });
    if (!servep.port) {
        cwarn("No port specified in qrk.json, defaulting to 5428.")
    }
    server.listen(servep.port)
})

function cwarn(message:string) {
    console.log(`>> qrk ${kleur.bgYellow("WARN")} ${kleur.yellow(message)}`)
}

function cerr(message:string) {
    console.log(`>> qrk ${kleur.bgRed("ERR")} ${kleur.red(message)}`)
}

function cinf(message:string, title?:string) {
    console.log(`>> qrk ${kleur.bgCyan(title?title.toUpperCase():"INFO")} ${kleur.cyan(message)}`)
}