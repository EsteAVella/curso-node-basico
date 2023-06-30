const Rols = require('../models/rols')

const isValidate = async( rol = '' ) => {
    const existRol = await Rols.findOne({ rol });
    if(!existRol ){
        throw new Error(`El rol ${rol} no es un rol permitido`);
    }
};

module.exports ={
    isValidate,
}
