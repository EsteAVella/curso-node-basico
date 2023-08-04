const { response, request } = require('express');
const { Product } = require('../models');


const createProduct = async(req, res = response ) =>{
    
    const {state, user, ...body }= req.body;

    const prodDB = await Product.findOne({name:body.name});

    if( prodDB ){
        return res.status(400).json({
            msg:`El producto ${ prodDB.name }, ya existe`
        });
    };

//GENERAR LA DATA A MANDAR

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    };
//PREPARAMOS LA DATA PARA GUARDAR
    const product = new Product( data );
//GRABAR LA DATA FISICAMENTE EN LA DB
    await product.save();

    res.status(201).json(product);
}

const getProducts = async ( req, res = response ) => {

    const { limit = 5 , next = 0} = req.query;
    const query = { state: true}
    // populate('product')

    const [ total, categories ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user','name')
        .populate('categorie','name')
        .skip( Number( next ) )
        .limit( Number( limit ) ),
    ]);

    
    res.json({
        total,
        categories
    })
}

//obtenerCategoria - populate {}
const getProduct = async( req, res = response ) =>{
    
    const { id } = req.params
    const product = await Product.findById( id )
                            .populate('user','name')
                            .populate('categorie','name');
                            
    res.json( product );
}


//actualizarCategoria Cambiar tuki por tukardo,
const putProduct = async (req, res = response) => {

    const { id } = req.params
    const { state, user, ...data } = req.body;

    //TODO validar si tiene permisos,
    if (data.name) {
        data.name = data.name.toUpperCase();    
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new:true } );

    // await categorie.save();

    res.json( product );
}

//borrarCategoria ============> state:false,
const deleteProduct = async (req, res = response) =>{
    
    const { id } = req.params;
    
    //Borrar de manera fisica........................
    // const user = await User.findByIdAndDelete( id );
    //Cambiando de estado
    const deleteProduct = await Product.findByIdAndUpdate( id, { state : false }, {new: true} );

    res.json( deleteProduct );
}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct,
}
