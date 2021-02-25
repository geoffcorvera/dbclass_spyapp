import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from '../db'

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    // TODO when to close client?
    app.get('/agents', (req: express.Request, res) => {
        const country = req.query.country!
        if (COUNTRIES.has(country.toString())) {
            // Connect client to database
            db.getClient(() => {
                // tslint:disable-next-line:no-console
                console.log('Connected to class DB')
            })

            const sql = `SELECT * FROM spy.agent WHERE country = '${country}' ORDER BY first`
            db.query(sql)
              .then((qr: QueryResult) => {
                  const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
                  res.render('agents', { agents: rowValues })
              })
              .catch((e: Error) => {
                  // tslint:disable-next-line:no-console
                  console.log(e.stack)
              })
            // TODO refactor to use pg.pool instead of pg.client
            // https://stackoverflow.com/questions/63074649/node-js-postgresql-pg-client-has-already-been-connected-you-cannot-reuse
              .finally(() => {
                  db.endClient()
              })
        } else {
            res.writeHead(500)
            res.write('Invalid parameters')
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