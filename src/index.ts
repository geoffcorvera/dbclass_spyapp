/*
 *  Adapted from David Neal's blog post: https://developer.okta.com/blog/2018/11/15/node-express-typescript
 */

import dotenv from 'dotenv'
import express from 'express'
import bodyparser from 'body-parser'
import path from 'path'
import * as routes from './routes'

dotenv.config()
const PORT = process.env.SERVER_PORT

const app = express()
app.use(bodyparser.urlencoded({ extended: false }))

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure routes
routes.register(app)

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on http://localhost:${ PORT }`)
})
