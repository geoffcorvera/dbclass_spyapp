import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from './db'

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    // TODO bug fix: this is getting called twice/form submit
    app.get('/agents', (req: express.Request, res) => {
        const country = req.query.country!

        if (COUNTRIES.has(country.toString())) {
            const sql = `SELECT * FROM spy.agent WHERE country = '${country}' ORDER BY first`

            // Connect client to database
            db.getClient()

            db.query(sql)
                .then((qr: QueryResult) => {
                    const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
                    res.render('agents', { country, agents: rowValues })
                })
                .catch((e: Error) => {
                    res.writeHead(500)
                    res.write(e.stack)
                    res.end()
                })
                .finally(() => db.endClient())
        }

        else {
            res.writeHead(500)
            res.write({ error: 'Invalid country input' })
            res.end()
        }
    })
}

const COUNTRIES = new Set([
    'Iraq',
    'Turkey',
    'Spain',
    'England',
    'Italy',
    'Egypt',
    'Greece',
    'Austrailia',
    'Russia',
    'China',
    'Luxembourg',
    'India',
    'France',
    'USA',
    'Israel',
    'Brazil',
    'Poland',
    'Germany',
    'Japan',
    'Singapore',
    'Canada',
    'Holland'
])