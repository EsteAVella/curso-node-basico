const { response, request } = require("express")
const jwt = require('jsonwebtoken')

const User = require('../models/user');


const JWTvalidator = async( req = request, res = response, next ) =>{
    
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            msg:'No es un token valido'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY)
        
        req.user = await User.findById( uid )

        
        req.uid = req.user;
        next();

    } catch (error) {
     
        console.log(error);
        res.status(401).json({
            msg:'No es un token valido'
        })
    }
}


module.exports = {
    JWTvalidator,
}