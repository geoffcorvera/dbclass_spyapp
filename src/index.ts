/*
 *
 *  Adapted from David Neal's blog post: https://developer.okta.com/blog/2018/11/15/node-express-typescript
 *
 */

// import http from 'http'
// import { Query, QueryResult } from 'pg'
// import { Client } from 'pg'

import express from 'express'
import path from 'path'
const app = express()
const PORT = 8080

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Route handler for home page
app.get('/', (req: any, res: any) => {
    res.render('index')
})

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on http://localhost:${ PORT }`)
})

/*
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

// Distinct countries in Agents table
enum Country {
    Iraq = 'Iraq',
    Turkey = 'Turkey',
    Spain = 'Spain',
    England = 'England',
    Italy = 'Italy',
    Egypt = 'Egypt',
    Greece = 'Greece',
    Austrailia = 'Austrailia',
    Russia = 'Russia',
    China = 'China',
    Luxembourg = 'Luxembourg',
    India = 'India',
    France = 'France',
    USA = 'USA',
    Israel = 'Israel',
    Brazil = 'Brazil',
    Poland = 'Poland',
    Germany = 'Germany',
    Japan = 'Japan',
    Singapore = 'Singapore',
    Canada = 'Canada',
    Holland = 'Holland'
}

let sendLandingPage = (res:any): void => {
    const form = `<form action="/country">
        <label for="country">country</label><input type="text" id="country">
        <input type="submit">
    </form>`

    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(`<html><body>${form}</body></html>`)
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
*/