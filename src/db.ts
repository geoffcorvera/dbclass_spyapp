import { Client } from 'pg'

const pw = 'foo'       // DO NOT check in your password!!!
const username = 'username'
const db = 'database'
const hostname = 'hostname'
const dbPort = 'port'

const connectionString =
    `postgresql://${ username }:${ pw }@${ hostname }:${ dbPort }/${ db }`

const client = new Client({ connectionString })

// TODO: when do you close client connection?
const query = (text: string, params?: [any]) => {
    return params ? client.query(text, params) : client.query(text)
}

const getClient = (callback?: any) => {
    client
        .connect()
        .then(() => callback())
        .catch((err: Error) => {
            // tslint:disable-next-line:no-console
            console.error('db connection error', err.stack)
        })
}

const endClient = () => {
    client.end()
}

export { query, getClient, endClient }