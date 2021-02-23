import http from 'http'
import { Query, QueryResult } from 'pg'
const { Client }  = require('pg')

// Don't commit you password
const PW = 'foobar'
const USERNAME = 'w21wdb5'
const DB = USERNAME
const HOSTNAME = 'dbclass.cs.pdx.edu'
const DB_PORT = '5432'

const connectionString = `postgresql://${USERNAME}:${PW}@${HOSTNAME}:${DB_PORT}/${DB}`
const client = new Client({ connectionString })
client.connect((err: any) => {
    if (err) {
        console.log('Connection error', err.stack)
    } else {
        console.log('Connected')
    }
})

// TODO: Should I install pg-cursor?
let server = http.createServer((req, res) => {
    // Routes
    if (req.url == '/') {
        sendLandingPage(res)
    } else if (req.url == '/agent') {
        client
            .query("SELECT * FROM spy.agent WHERE last like 'W%'")
            .then((qr: QueryResult) => {
                res.writeHead(200, { 'content-type': 'text/html' })
                writeHeadAndStyle(res)
                writeBody(res, qr.rows)
                res.write('</html>')
                res.end()
            })
            .catch((e: any) => console.log(e.stack))
    } else {
        res.end('Invalid request')
    }
})

let sendLandingPage = (res:any): void => {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<html><body><p>Spy Database</p></body></html>')
    res.end()
}

let writeHeadAndStyle = (res:any): void => {
    let styling = `<style>
        table { border-collapse:collapse; width:100%; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 10px; }
    </style>`

    res.write('<html><head><title>Spy App</title>' + styling + '</head>')
}

let writeBody = (res: any, rows: any): void => {
    let tableHeader = '<tr>'
        + '<th>agent_id</th>'
        + '<th>first</th><th>middle</th><th>last</th>'
        + '<th>address</th><th>city</th><th>country</th>'
        + '<th>salary</th>'
        + '<th>clearance_id</th></tr>'
    let rowsMarkup = rows.map((row:any) => `<tr><td>${ Object.values(row).join('</td><td>') }</td></tr>`)
    
    res.write('<body><h1>Agents</h1><table>' + tableHeader + rowsMarkup.join('') + '</table></body>')
}

const PORT = 8080
server.listen(PORT)
console.log(`Server listening on ${PORT}`)
