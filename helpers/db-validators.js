const Rols = require('../models/rols');
const user = require('../models/user');

const isValidate = async( rol = '' ) => {
    
    const existRol = await Rols.findOne({ rol });
    if(!existRol ){
        throw new Error(`El rol ${rol} no es un rol permitido`);
    }
};

    //verificar si el correo existe asi no encripta al dope
const existMail = async (mail ='') => {
    
    const existMail = await user.findOne( {mail} )
    if( existMail ){
        throw new Error(`El correo ${mail} ya esta registrado`);
    };
}

//verificar si el correo existe asi no encripta al dope
const existId = async (id ='') => {

    const existId = await user.findById( id );
        if( !existId ){
            throw new Error(`El id ${id} no se encuentra registrado`);
        };
}
    


module.exports ={
    isValidate,
    existMail,
    existId,
}
