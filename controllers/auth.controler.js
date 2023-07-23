const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { genJWT } = require('../helpers/gen-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req = request, res = response ) =>{

    const { mail, password} = req.body

    try {
        //verificar que el mail exista en la bd
        const user = await User.findOne({ mail });
        if( !user ){
            return res.status(400).json({
                msg:'Usuario/password incorrecto ---- CORREO'
            })
        }
        // Estate = true?
        if( !user.state ){
            return res.status(400).json({
                msg:'Usuario/password incorrecto ---- estado: false'
            })
        }
        //contraseña OK?
        const validPassword = bcryptjs.compareSync( password, user.password)
        if( !validPassword ){
            return res.status(400).json({
                msg:'Usuario/password incorrecto ---- PASSWORD'
            })
        }
        //genero el JWT
        const token = await genJWT(user.id);
        
        res.json({
            user,
            token,    
        })

    }catch(error) {
        console.log(error)
        return res.status(500).json({
            msg:'Contacte con el administrador',
        })
    }
        
}
const googleSignIn = async(req, res = response, next) =>{

    const { id_token } = req.body

    try {
        
        const { name, mail, img } = await googleVerify( id_token );

        let user = await User.findOne({ mail });

        if( !user ){
            //tengo que crear user
            const data ={
                name,
                mail,
                password:'asasd',
                img,
                rol:"ADMIN_ROLE",
                google:true,
            };

            user = new User ( data );
            await user.save();
        }

        if( !user.state ){
            return res.status(401).json({
                msg:'User bloqueado, comuniquese con el admin'
            })
        }
        
        //genero el JWT
        const token = await genJWT(user.id);
    
        res.json({
            user,
            token,
        });
    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'El token no pudo verificarse',
            error
        })
    }
}

module.exports = {
    login,
    googleSignIn,
    
}