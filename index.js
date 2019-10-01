const { Pool, Client } = require('pg')

const connectionString = 'postgres://osdtvtdq:CVBPgsz-w0p9wGShZ96JAl-ZBrirwZYv@salt.db.elephantsql.com:5432/osdtvtdq'
const pool = new Pool({
  connectionString: connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  connectionString: connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })