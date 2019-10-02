require('dotenv').config();
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.DB_CONN;

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

const http = require('http');

/** handle GET request */
function getHandler(req, res, reqUrl) {
    res.writeHead(200);
    res.write('GET parameters: ' + reqUrl.searchParams);
    res.end();
}

/** handle POST request */
function postHandler(req, res, reqUrl) {
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        res.writeHead(200);
        res.write('POST parameters: ' + chunk);
        res.end();
    });
}

/** if there is no related function which handles the request, then show error message */
function noResponse(req, res) {
    res.writeHead(404);
    res.write('Sorry, but we have no response..\n');
    res.end();
}

http.createServer((req, res) => {
    // create an object for all redirection options
    const router = {
        'GET/retrieve-data': getHandler,
        'POST/send-data': postHandler,
        'default': noResponse
    };
    // parse the url by using WHATWG URL API
    let reqUrl = new URL(req.url, 'http://127.0.0.1/');
    // find the related function by searching "method + pathname" and run it
    let redirectedFunc = router[req.method + reqUrl.pathname] || router['default'];
    redirectedFunc(req, res, reqUrl);
}).listen(8080, () => {
    console.log('Server is running at http://127.0.0.1:8080/');
});




/*
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
*/

/*
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

*/