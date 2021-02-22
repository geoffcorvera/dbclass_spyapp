import http from 'http'
const { Client }  = require('pg')

const connectionString = 'postgresql://w21wdb5:@1Samsung@dbclass.cs.pdx.edu:5432/w21wdb5'

const client = new Client({ connectionString })
client.connect((err: any) => {
    if (err) {
        console.log('Connection error', err.stack)
    } else {
        console.log('Connected')
    }
})

const queryStr = "SELECT * FROM spy.agent WHERE first like 'W%'"
client.query(queryStr, (err: any, res: any) => {
    console.log(err, res)
    client.end()
})

let server = http.createServer((req, res) => {
    // Routes
    if (req.url == '/') {
        res.writeHead(200)
        res.write('<html><body><p>Hello world</p></body></html>')
        res.end()
    }
    else {
        res.end('Invalid request')
    }
})

const PORT = 8080
server.listen(PORT)
console.log(`Server listening on ${PORT}`)
