const mc = require('minecraft-protocol');

class MinecraftClient{
    constructor(username, mail, password) {
        this.username = username;
        this.mail = mail;
        this.password = password;
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
        this.client.end()
    }
}

module.exports = MinecraftClient;

var kams = new MinecraftClient("KaKams", "sacrificed-soul@hotmail.com", "wxcv1234");
kams.connect();
setTimeout(function () {
    console.log(kams.client.socket.writable);
    setTimeout(function () {
        kams.quit();
    }, 2000);
}, 2000);
//console.log(kams.client.socket.writable);