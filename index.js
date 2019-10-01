/*const { Pool, Client } = require('pg')

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

*/
require('dotenv').config();
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.ELEPHANTSQL_URL || "postgres://osdtvtdq:CVBPgsz-w0p9wGShZ96JAl-ZBrirwZYv@salt.db.elephantsql.com:5432/osdtvtdq";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    client.end();
  });
});


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