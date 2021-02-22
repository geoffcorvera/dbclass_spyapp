import http from 'http'
import { QueryResult } from 'pg'
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

// TODO: npm install pg-cursor

let server = http.createServer((req, res) => {
    // Routes
    if (req.url == '/') {
        res.writeHead(200)
        res.write('<html><body><p>Hello world</p></body></html>')
        res.end()
    } else if (req.url == '/agent') {
        client
            .query("SELECT * FROM spy.agent WHERE first like 'W%'")
            .then((queryResult: QueryResult) => {
                console.log(queryResult.rows[0])

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify({ results: queryResult.rows[0] }))
                res.end()
            })
            .catch((e: any) => console.log(e.stack))

    } else {
        res.end('Invalid request')
    }
})

const PORT = 8080
server.listen(PORT)
console.log(`Server listening on ${PORT}`)
