import { Pool } from 'pg'

const pw = '@1Samsung'       // DO NOT check in your password!!!
const username = 'w21wdb5'
const db = 'w21wdb5'
const hostname = 'dbclass.cs.pdx.edu'
const dbPort = '5432'

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