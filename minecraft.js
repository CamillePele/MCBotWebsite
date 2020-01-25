const mc = require('minecraft-protocol');

class MinecraftClient{
    constructor(username, mail, password) {
        this.username = username;
        this.mail = mail;
        this.password = password;
        /*
        this.client = mc.createClient({
            username: this.mail, // email and password are required only for
            password: this.password,
        });

         */
    }

    connect(){
        this.client = mc.createClient({
            host: "optimis.lcmc.pro",   // optional
            port: 25565,         // optional
            username: this.mail, // email and password are required only for
            password: this.password,
        });
    }


    say(text){
        if(!this.client)
            return;
        this.client.write("chat", { message: text });
    }

    sleeep(){
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

//var Kams = new MinecraftClient("KaKams", "sacrificed-soul@hotmail.com", "wxcv1234");