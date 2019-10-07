const http = require('http');
const url = require('url');
const pg = require('pg');
const routing = require('../routing');
const service = require('../service/service');
require('dotenv').config();


const client = new pg.Client(process.env.DB_CONN);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //client.end();
  });
});

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    var jsonString = '';
    res.setHeader('Content-Type', 'application/json');
    req.on('data', (data) => {
        jsonString += data;
    });
    req.on('end', () => {
        routing.define(req, res, jsonString);
    });
    // GET Endpoint
    if (reqUrl.pathname == '/sample' && req.method === 'GET') {
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        client.query('SELECT * FROM "public"."films"', function (error, result) {
          if (error) throw error;
          console.log(result.rows);
          res.end(`{{result.rows}}`);
      });
    // POST Endpoint
    } else if (reqUrl.pathname == '/test' && req.method === 'POST') {
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.testRequest(req, res); 

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' + reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});