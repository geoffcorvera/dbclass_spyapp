import { Pool } from 'pg'

const pw = 'foo'       // DO NOT check in your password!!!
const username = 'foo'
const db = 'foo'
const hostname = 'foo'
const dbPort = 'foo'

const connectionString =
    `postgresql://${ username }:${ pw }@${ hostname }:${ dbPort }/${ db }`

const pool = new Pool({ connectionString })

const query = (text: string, params?: any[]) => pool.query(text, params)

export { query }