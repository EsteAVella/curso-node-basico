const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { uploadArchive } = require('../helpers/upload-archive');
const { User, Product } = require('../models');



const uploadFiles = async(req, res = response ) =>{
  
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
           msg:'No files were uploaded.'
        });
    };
    try {
        const fName = await uploadArchive( req.files, undefined, 'imgs' );
        res.json({ fName });
        
    } catch (error) {
        res.status(400).json({
            msg:'archivo no permitido'
        });
    }    
}

const accImg = async(req, res = response ) =>{

    const { id, colection } = req.params;
    let model;

    switch ( colection ) {
        case 'users':
            model = await User.findById(id).exec();
            if( !model ){
                return res.status(400).json({
                    msg: `No existe usuario con el siguiente id: ${id}`
                })
            }
        break;
        case 'products':
            model = await Product.findById(id).exec();
            if( !model ){
                return res.status(400).json({
                    msg: `No existe producto con el siguiente id: ${id}`
                })
            }
            
        break;
    
        default:
            return res.status(500).json({ msg: 'No validado'})
    }
        //limpiar imagenes 
    if ( model.img ){
        const pathImg = path.join( __dirname,'../uploads', colection, model.img );
        if( fs.existsSync( pathImg ) ){
            fs.unlinkSync( pathImg );
        }
    }

    const fileName = await uploadArchive( req.files, undefined, colection );
    model.img = fileName;

    await model.save();

    res.json( model )

}

const showImg = async( req, res = response ) =>{

    const { id, colection } = req.params;
    
    let model;

    switch ( colection ) {
        case 'users':
            model = await User.findById(id).exec();
            if( !model ){
                return res.status(400).json({
                    msg: `No existe usuario con el siguiente id: ${ id }`
                })
            }
        break;
        case 'products':
            model = await Product.findById(id).exec();
            if( !model ){
                return res.status(400).json({
                    msg: `No existe producto con el siguiente id: ${ id }`
                })
            }
        break;
        default:
            return res.status(500).json({ msg: 'No validado'})
    }
        //limpiar imagenes 
    if ( model.img ){
        const pathImg = path.join( __dirname,'../uploads', colection, model.img );
        if( fs.existsSync( pathImg ) ){
            return res.sendFile( pathImg);
        }
    }
    res.json({
        msg:'Falta place holder'
    })
}

module.exports ={ 
    uploadFiles,
    accImg,
    showImg,
}