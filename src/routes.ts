import { count, table } from 'console'
import * as express from 'express'
import { QueryResult } from 'pg'
import * as db from './db'

export const register = (app: express.Application) => {
    app.get('/', (req: any, res) => {
        res.render('index', { header: 'Spy App' })
    })

    app.get('/agents', agentsHandler)
}

const onlyAlpha = /^[a-zA-Z ]*$/

const agentsHandler = (req: express.Request, res: any) => {
    const { country, team } = req.query

    const sql =  `SELECT last||', '||first AS agent, name AS team, city, country, salary
                FROM spy.agent NATURAL JOIN spy.teamrel NATURAL JOIN spy.team
                WHERE LOWER(country) = $1 AND LOWER(name) = $2
                ORDER BY country, team, agent`

    // Check that input is only letters and spaces
    if (typeof country === 'string' && typeof team === 'string') {
        if ((country === '' || onlyAlpha.test(country)) && (team === '' || onlyAlpha.test(team))) {

            // tslint:disable-next-line:no-console
            console.log(sql)

            db
                .query(sql, [country.toLowerCase(), team.toLowerCase()])
                .then((qr: QueryResult) => {
                    const rows = qr.rows.map((row: any) => Object.values(row))
                    const headers = Object.keys(qr.rows[0])
                    res.render('agents', { country, team, headers, agents: rows})
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
    }
}