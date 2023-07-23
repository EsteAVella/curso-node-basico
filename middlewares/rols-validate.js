const { response, request } = require('express');
const User = require('../models/user');


const adminRole = (req = request, res = response, next ) => {

    if ( !req.user ){
        return res.status(500).json({
            msg:'Imposible validar sin el token'
        })
    }
    const { name, rol} = req.user;

    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no tiene los permisos suficientes para la accion que desea hacer`
        });
    }


    next();
}

const reqRols = (...rols ) => {
    
    return (req, res= response, next) =>{
        
        if ( !req.user ){
            return res.status(500).json({
                msg:'Imposible validar sin el token'
            })
        }
        if( rols.includes(req.user.rol ) ){
            return res.status(401).json({
                msg:`el usuario para eliminar necesita alguno de los siguientes ROLS:${rols}`
            })
        }
        next();
    }

}

module.exports = {
    adminRole,
    reqRols,
}
