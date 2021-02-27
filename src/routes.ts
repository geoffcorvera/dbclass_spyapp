import { count } from 'console'
import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from './db'

// Regex to check only letters and spaces are used
const alphaOnly = /^[a-zA-Z ]+$/

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    // TODO bug fix: this is getting called twice/form submit
    app.get('/agents', (req: express.Request, res) => {
        const { country, team } = req.query

        // Check if only letters are used in user-input
        if (typeof country === 'string' && alphaOnly.test(country)) {
            // build query
            const params = [ country ]

            let sqlSelect = "SELECT first||' '||last AS agent, salary, city, country"
            let sqlFrom = " FROM spy.agent"
            let sqlWhere = " WHERE LOWER(country) = $1"
            let sqlOrder = " ORDER BY country"

            if (typeof team === 'string' && alphaOnly.test(team)) {
                sqlSelect += ", name as team"
                sqlFrom += " NATURAL JOIN spy.teamrel NATURAL JOIN spy.team"
                sqlWhere += " AND LOWER(name) = $2"
                sqlOrder += ", team"
                params.push(team.toLowerCase())
            }

            const sql = sqlSelect + sqlFrom + sqlWhere + sqlOrder

            // tslint:disable-next-line:no-console
            console.log(sql)

            // Send query to the database and handle response
            db
                .query(sql, params)
                .then((qr: QueryResult) => {
                    if (qr.rowCount > 0) {
                        const headers = Object.keys(qr.rows[0])
                        const rowValues: any[] = qr.rows.map((row: any) => Object.values(row))
                        res.render('agents', { country, headers, agents: rowValues })
                    } else {
                        res.render('index', { header: 'No results' })
                    }
                })
                .catch((e: Error) => {
                    res.writeHead(500)
                    res.write(e.stack)
                    res.end()
                })

        } else {
            res.writeHead(200)
            res.write('Invalid input')
            res.end()
        }
    })
}