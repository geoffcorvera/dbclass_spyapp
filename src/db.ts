import { Pool } from 'pg'

const pw = 'foo'       // DO NOT check in your password!!!
const username = 'foo'
const db = 'foo'
const hostname = 'foo'
const dbPort = 'foo'

const connectionString =
    `postgresql://${ username }:${ pw }@${ hostname }:${ dbPort }/${ db }`

const pool = new Pool({ connectionString })

// pool.on('error', (err: Error, client: PoolClient) => {
//     // tslint:disable-next-line:no-console
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// })

const query = (text: string, params?: any[]) => pool.query(text, params)

export { query }