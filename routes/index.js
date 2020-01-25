var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var minecraft = require('../minecraft');

const mc = require('minecraft-protocol');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mcbot"
});

const clientsList = [];

/* GET client list */
function getClients(callback) {
    var clients = Array();
    con.query("SELECT * FROM clients", function (err, result) {
        if (err) console.log(err);

        if (result)
            result.forEach(function (element) {
                clients.push(element);
            });
        return callback(clients)
    });
}

function getClientInfo(username, callback) {
    con.query("SELECT * FROM clients WHERE username = '"+username+"'", function (err, result) {
        if (err) console.log(err);
        return callback(result)
    });
}

function connectClient(username){
    getClientInfo(username, function (client) {
        if (!clientsList[client[0]['username']])
            clientsList[client[0]['username']] = new minecraft(client[0]['username'], client[0]['mail'], client[0]['password']);
        clientsList[username].connect();
    });
    con.query("UPDATE clients SET lastConnect = '"+new Date().toISOString()+"' WHERE username = '"+username+"'", function (err, result) {
        if (err) console.log(err);
    });

}

function disconnectClient(username){
    delete clientsList[username];
}

router.get('/connect/:username', function(req, res, next) {
    console.log(req.params.username + " est connecté");
    connectClient(req.params.username);
    res.redirect('/');
});

router.get('/disconnect/:username', function(req, res, next) {
    console.log(req.params.username + " est déconnecté");
    disconnectClient(req.params.username);
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    getClients(function(clients){
        clients.forEach(function (element, index) {
            /*
            if (clientsList[element['username']] != null) {
              //console.log(clientsList[element['username']]);
              clients[index]['online'] = clientsList[element['username']].client.protocolState === 'play';
              console.log(clients[index]['online'])
            }
            */

        });
        //console.log(clients);
        res.render('index', { title: 'Express' , clients});
    });
});

module.exports = router;