import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from '../db'

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    // TODO when to close client?
    app.get('/agents', (req: any, res) => {
        // Connect client to database
        db.getClient(() => {
            // tslint:disable-next-line:no-console
            console.log('Connected to class DB')
        })

        const sql = "SELECT * FROM spy.agent WHERE last like 'W%' ORDER BY first"
        db.query(sql)
          .then((qr: QueryResult) => {
              const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
              res.render('agents', { agents: rowValues })
          })
          .catch((e: Error) => {
              // tslint:disable-next-line:no-console
              console.log(e.stack)
          })
    })
}


