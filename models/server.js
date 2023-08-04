const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads',
            user:       '/api/user'

        }
    
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

        //FILEUPLOAD CONFIG
        this.app.use(fileUpload({
            useTempFiles     : true,
            tempFileDir      : '/tmp/',
            createParentPath : true
        }));
    }

    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.user, require('../routes/user'));
    }
    
    listen() {
       
        this.app.listen(this.port, () => {
            console.log(`Servidor andando en el ${this.port}`)
        })
    }
}


module.exports = Server;