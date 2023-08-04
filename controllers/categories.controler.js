const { response, request } = require('express');
const { Categorie } = require('../models');


const createCategorie = async(req, res = response ) =>{
    
    const name = req.body.name.toUpperCase();

    const catDB = await Categorie.findOne({ name });

    if( catDB ){
        return res.status(400).json({
            msg:`La categoria ${ catDB.name }, ya existe`
        });
    };

//GENERAR LA DATA A MANDAR

    const data = {
        name,
        user: req.user._id
    };
//PREPARAMOS LA DATA PARA GUARDAR
    const categorie = new Categorie( data );
//GRABAR LA DATA FISICAMENTE EN LA DB
    await categorie.save();

    res.status(201).json(categorie);
}

const getCategories = async ( req, res = response ) => {

    const { limit = 5 , next = 0} = req.query;
    const query = { state: true}
    // populate('product')

    const [ total, categories ] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
        .populate('user','name')
        .skip( Number( next ) )
        .limit( Number( limit ) ),
    ]);

    
    res.json({
        total,
        categories
    })
}

//obtenerCategoria - populate {}
const getCategorie = async( req, res = response ) =>{
    
    const { id } = req.params
    const categorie = await Categorie.findById(id)
                                    .populate('user','name');

    res.json({
        categorie,
    });
}


//actualizarCategoria Cambiar tuki por tukardo,
const putCategorie = async (req, res = response) => {

    const { id } = req.params
    const { state, user, ...data } = req.body;

    //TODO validar si tiene permisos,
    data.name = data.name.toUpperCase();    
    data.user = req.user._id;


    const categorie = await Categorie.findByIdAndUpdate( id, data, {new:true} );

    // await categorie.save();

    res.json( categorie );
}

//borrarCategoria ============> state:false,
const deleteCategorie = async (req, res = response) =>{
    
    const { id } = req.params;
    
    //Borrar de manera fisica........................
    // const user = await User.findByIdAndDelete( id );
    //Cambiando de estado
    const deleteCategorie = await Categorie.findByIdAndUpdate( id, { state : false }, {new: true} );

    res.json( deleteCategorie );
}


module.exports = {
    createCategorie,
    getCategories,
    getCategorie,
    putCategorie,
    deleteCategorie,
}