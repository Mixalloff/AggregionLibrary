'use strict';

var express    = require("express"),
    request    = require('request'),
    app        = express();

const DEFAULT_IMAGE = 'https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data';

class Server {
    constructor(port){
        this.port = port;
    }
    
    initExpress(){
        app.use(express.static(__dirname + '/clientApp'));
        // Запрос картинки с обработкой 404 ошибки
        app.get('/image/:id', function(req, res) {
            var id = req.params.id,
                address = 'https://storage.aggregion.com/api/files/' + id + '/shared/data';
            request(address, function(err, response, body) {
                if (err || response.statusCode === 404) {
                    res.redirect(DEFAULT_IMAGE);
                } else {
                    res.redirect(address);
                }
            });
        });
        app.use('*', function(req, res){
            res.sendFile(__dirname + '/clientApp/index.html');
        });
    }
    
    run(){
        this.initExpress();
        app.listen(this.port);
        console.log('Сервер запущен на порте ' + this.port);
    }
}

var server = new Server(8080);
server.run();

module.exports = Server;

