import * as express from 'express'
import { QueryResult } from 'pg'
import { Client } from 'pg'


// Database parameters
const PW = '@1Samsung'             // Don't commit you password
const USERNAME = 'w21wdb5'
const DB = USERNAME
const HOSTNAME = 'dbclass.cs.pdx.edu'
const DB_PORT = '5432'

const connectionString = `postgresql://${USERNAME}:${PW}@${HOSTNAME}:${DB_PORT}/${DB}`
const client = new Client({ connectionString })
client.connect((err: any) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log('Database connection error', err.stack)
    } else {
        // tslint:disable-next-line:no-console
        console.log('Connected to class DB')
    }
})

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index')
    })

    app.get('/agents', (req: any, res) => {
        client
            .query("SELECT * FROM spy.agent WHERE last like 'W%'")
            .then((qr: QueryResult) => {
                const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
            })
            .catch((e: any) => {
                // tslint:disable-next-line:no-console
                console.log(e.stack)
            })

        res.render('agents')
    })
}


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