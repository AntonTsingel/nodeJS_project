/*var http = require("http");
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  console.log('LOG');
  res.end("done");
}).listen(4000);
*/

const http = require('http');
const { parse } = require('querystring');
const qs = require('querystring');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Parsed data belonging to ${result.fname}`);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="file" name="photo" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3000);

function reqres(req, res) {
  if (req.method == 'POST') {
      var body = '';

      req.on('data', function (data) {
          body += data;

          if (body.length > 1e6)
              req.connection.destroy();
      });

      req.on('end', function () {
          var post = qs.parse(body);
          // use post['blah'], etc.
      });
  }
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
            console.log(body);
        });
    }
    else {
        callback(null);
    }
}
function consol(){
date = 'Date:' + new Date() ;
console.log(date);
};
function tick(){
var a = new Date(); // Current date now.
var b = new Date(2019, 9, 01, 19, 0, 0, 0); // Start of 2010.
var utc_a = new Date(a.toUTCString());
var utc_b = new Date(b.toUTCString());
var diff = (utc_b - utc_a);
var seconds = parseInt(diff/1000);
var minutes = parseInt(diff/60000);
var hours = parseFloat(seconds/3600);

console.log(seconds);
console.log(minutes);
console.log(hours.toFixed(2));
}
let timerId = setInterval(() => consol() & tick(), 20000);

/*
var qs = require('querystring');

function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
        });
    }
}
*/