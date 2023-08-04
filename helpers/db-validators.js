const { Product } = require('../models');
const categorie = require('../models/categorie');
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
 
//Validamos si existe la categoria para agregar
const existCategorieId = async (id ='') => {

    const existCategorie = await categorie.findById( id );
        if( !existCategorie ){
            throw new Error(`El id ${id} no se encuentra registrado`);
        };
}

const existProductId = async (id ='') => {

    const existProduct = await Product.findById( id );
        if( !existProduct ){
            throw new Error(`El id ${id} no existe`);
        };
}

const colectionsOK = async ( colection ='', colections = [] ) => {

    const incudes = colections.includes( colection );
    if( !incudes ){
        throw new Error(`la coleccion ${colection} no existe las permitidas son las siguientes ${colections}`);
    }
    return true;
}



module.exports ={
    isValidate,
    existMail,
    existId,
    existCategorieId,
    existProductId,
    colectionsOK,
}
