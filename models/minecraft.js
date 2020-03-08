const mc = require('minecraft-protocol');
var fs = require('fs');

let rawdata = fs.readFileSync('config.json');
const config = JSON.parse(rawdata);

const ip = config['server']['ip'];
const port = config['server']['port'];

class MinecraftClient{
    constructor(username, mail, password) {
        this.username = username;
        this.mail = mail;
        this.password = password;
    }

    connect(){
        this.client = mc.createClient({
            host: ip,   // optional
            port: port,         // optional
            username: this.mail, // email and password are required only for
            password: this.password,
        });
    }


    say(text){
        if(!this.client)
            return;
        this.client.write("chat", { message: text });
    }

    sleep(){
        this.client.end("sleep");
        setTimeout(function () {
            this.connect()
        }, 20000);
    }

    /*
    this.client.on('chat', function(packet){

    })

     */

    quit(){
        if(!this.client)
            return;
        this.client.end("sleep")
    }
}

module.exports = MinecraftClient;
