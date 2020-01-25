var express = require('express');
var router = express.Router();
var minecraft = require('../minecraft');
var fs = require('fs');

let rawdata = fs.readFileSync('clients.json');
const clients = JSON.parse(rawdata);

//console.log(clients[0]['mail']);

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
    console.log(req.params.username + " est connecté");
    connectClient(req.params.username);
    res.redirect('/');
});

router.get('/disconnect/:username', function(req, res, next) {
    console.log(req.params.username + " est déconnecté");
    instancesList[req.params.username].quit();
    delete instancesList[req.params.username];
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    for(var i in clients){
        if (instancesList[clients[i].username]) {
            clients[i].online = true;
        }
        else
            clients[i].online = false;
    }
    console.log()
    res.render('index', { title: 'Express' , clients});
});

module.exports = router;