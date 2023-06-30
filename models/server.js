const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.userPath = '/api/user'
    
        //CONECCION CON LA BASE DE DATOS
        this.conectDB();
        //MIDDLEWARES siempre se ejecutan cuando abro el sv 
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }
    
    async conectDB(){
        await dbConnection();
    }

    middlewares() {
        
        //CORS
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() );

        //DIRECTORIO PUBLICO
        this.app.use( express.static('public') );
    }

    routes(){
        
        this.app.use(this.userPath, require('../routes/user'));
    }
    
    listen() {
       
        this.app.listen(this.port, () => {
            console.log(`Servidor andando en el ${this.port}`)
        })
    }
}


module.exports = Server;