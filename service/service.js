const url = require('url');

module.exports = {
    sampleRequest,
    testRequest,
    invalidRequest
};

function sampleRequest(req, res) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }
    var response = {
        "text": "Hello " + name
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

function testRequest(req, res) {
    body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        postBody = JSON.parse(body);
        var response = {
            "text": "Post Request Value is  " + postBody.value
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

function invalidRequest(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};