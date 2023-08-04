const { response, request } = require('express');
const { User, Product, Categorie } = require ("../models");
const { ObjectId } = require('mongoose').Types;

const colectionField = [
    "user",
    "categorie",
    "productos",
    "rols",
];

const searchUser = async (term ="" , res = response) => {

    const isMongoId = ObjectId.isValid( term ); //TRUE OR FALSE

    if( isMongoId ) {
        const user = await User.findById(term)
        return res.json({
            results:( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term,'i')
    const users = await User.find({ 
        $or:[{ name: regex }, { mail: regex }],
        $and:[{ state: true }]
     });

    res.json({
       resutls: users 
    });

}

const searchCategorie = async (term ="" , res = response) => {

    const isMongoId = ObjectId.isValid( term ); //TRUE OR FALSE

    if( isMongoId ) {
        const categorie = await Categorie.findById(term)
        return res.json({
            results:( categorie ) ? [ categorie ] : []
        });
    }

    const regex = new RegExp( term,'i')
    const categories = await Categorie.find({ name: regex, state: true });

    res.json({
       resutls: categories 
    });

}

const searchProduct = async (term ="" , res = response) => {

    const isMongoId = ObjectId.isValid( term ); //TRUE OR FALSE

    if( isMongoId ) {
        const product = await Product.findById(term).populate('categorie','name');
        return res.json({
            results:( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term,'i')
    const products = await Product.find({ name: regex, state: true });

    res.json({
       resutls: products 
    });

}

const search = ( req, res = response )=>{

    const { colection, term } = req.params;

    if ( !colectionField.includes( colection ) ) {
        return res.status(400).json({
            msg: `Las condiciones permitidas son ${ colectionField }`
        })
    }

    switch ( colection ) {
        case 'user':
            searchUser(term, res);
        break;
       case 'categorie':
            searchCategorie(term, res);
        break;
        case 'product':
            searchProduct(term, res);
        break;
       default:
         res.status(500).json({
            msg:'Busqueda no implementada en el controller'
        })
    }
}


module.exports = {
    search,
}