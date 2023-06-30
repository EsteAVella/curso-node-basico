const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const res = response;
const req = request;

const userGet = (req, res) => {
    
    const { q, name = 'no name', apikey, page, limit } = req.query;

    res.json({
        id: 1,
        msg : 'get API, controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const userPut = (req, res) => {
    
    const { id } = req.params
    const {nombre, edad, estado} = req.body;

    res.json({
        msg : 'put API, controller',
        id,
        nombre,
        edad,
        estado,
    });
}

const userPatch = (req, res) => {
    res.json({
        id: 1,
        msg : 'patch API, controller'
    });
}

const userDelete = (req, res) => {
    res.json({
        id: 1,
        msg : 'delete API, controller'
    });
}

const userPost = async(req, res) => {
    
    const { name, mail, password, rol } = req.body;
    const user = new User({ name, mail, password, rol} );

    //verificar si el correo existe asi no encripta al dope
    const existMail = await User.findOne({mail});
    if( existMail ){
        return res.status(400).json({
            msg:'El correo esta registrado'
        });
    }
    //Encriptacion de la contrasenia
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    //Guardado en la DB
    await user.save();

    res.json({
        msg : 'post API',
        user
    });
}


module.exports ={

    userGet,
    userPut,
    userPatch,
    userDelete,
    userPost
}