import { count } from 'console'
import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from './db'

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    // TODO bug fix: this is getting called twice/form submit
    app.get('/agents', (req: express.Request, res) => {

        if (req.query.country !== undefined) {
            const country = req.query.country.toString()

            if (COUNTRIES.has(country)) {
                const getAgentsByCountrySQL = `SELECT * FROM spy.agent WHERE LOWER(country) = $1 ORDER BY city`

                db
                    .query(getAgentsByCountrySQL, [country.toLowerCase()])
                    .then((qr: QueryResult) => {
                        const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
                        res.render('agents', { country, agents: rowValues })
                    })
                    .catch((e: Error) => {
                        res.writeHead(500)
                        res.write(e.stack)
                        res.end()
                    })

            } else {
                res.writeHead(200)
                res.write('Invalid country input')
                res.end()
            }
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