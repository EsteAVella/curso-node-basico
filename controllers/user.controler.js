const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const res = response;
const req = request;

const userGet = async(req, res) => {
    
    const { limit = 5 , next = 0} = req.query;
    const query = {state: true}
    // const { q, name = 'no name', apikey, page, limit } = req.query;
    
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip( Number( next ) )
        .limit( Number( limit ) ),
    ]);

    res.json({
        total,
        users,
    });
}

const userPut = async(req, res = response) => {
    
    const { id } = req.params
    const {password, google, mail, ...rest } = req.body;

    //TODO validar vs base de datos
    if ( password ){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }
    
    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        user,
    });
}

const userPatch = (req, res) => {
    res.json({
        id: 1,
        msg : 'patch API, controller'
    });
}

const userDelete = async(req, res) => {
    
    const { id } = req.params;
    const uid = req.uid;
    
    //Borrar de manera fisica........................
        // const user = await User.findByIdAndDelete( id );
    //Cambiando de estado
    const user = await User.findByIdAndUpdate( id, { state : false } );

    const userAutorized = req.user;

    res.json({user, userAutorized});
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