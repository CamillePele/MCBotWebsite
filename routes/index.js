var express = require('express');
var router = express.Router();
var minecraft = require('../models/minecraft');
var fs = require('fs');
var cookies = require('../models/cookiesHandler');

let rawdata = fs.readFileSync('clients.json');
const clients = JSON.parse(rawdata);

const instancesList = [];

/* GET client list */

function getClientInfo(username) {
    for(var i in clients){
        if(clients[i].username === username)
            return clients[i]
    }
}

function connectClient(username){
    let client = getClientInfo(username);
    if (!instancesList[client.username])
        instancesList[client.username] = new minecraft(client.username, client.mail, client.password);
    instancesList[username].connect();
}

router.get('/connect/:username', function(req, res, next) {
    if (!cookies.checkConnected(res, req)) return;
    console.log(req.params.username + " est connecté");
    connectClient(req.params.username);
    res.redirect('/');
});

router.get('/disconnect/:username', function(req, res, next) {
    if (!cookies.checkConnected(res, req)) return;
    console.log(req.params.username + " est déconnecté");
    instancesList[req.params.username].quit();
    delete instancesList[req.params.username];
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!cookies.checkConnected(res, req)) return;
    for(var i in clients){
        if (instancesList[clients[i].username]) {
            clients[i].online = true;
        }
        else
            clients[i].online = false;
    }

    res.render('index', { title: 'Express' , clients});
});

module.exports = router;