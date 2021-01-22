/**
 * SERVER
 */

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let backendPort = 3000;

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
res.header(
'Access-Control-Allow-Headers',
'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
);
next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
bodyParser.urlencoded({
extended: true
})
);


app.listen(backendPort, function() {
console.log('Express server listening on port ' + backendPort);
});

/**
 * METHODS
 */

const data = require('./data/tacos.js');
let tacos = data.tacos;
const fs = require('fs');

app.get('/tacos', (req, res) => {
    res.json(tacos);
});

app.post('/update', (req, res) => {
    const body = JSON.parse(req.body);
    tacos[body.index] = body.taco;
    const writeData = "exports.tacos = "+JSON.stringify(tacos);
    fs.writeFile('./data/tacos.js', writeData, err => {
        err ? res.status(200).send(err) : res.json(tacos);
    });
});

app.delete('/delete/:id', (req, res) => {
    const index = req.params.id;
    tacos.splice(index, 1);
    const writeData = "exports.tacos = "+JSON.stringify(tacos);
    fs.writeFile('./data/tacos.js', writeData, err => {
        err ? res.status(200).send(err) : res.json(tacos);
    });
});