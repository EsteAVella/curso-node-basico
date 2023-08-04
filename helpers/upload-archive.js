const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadArchive = ( files, validTypes = [ 'png','jpg','jpeg','gif'], dirname = '') => {

    return new Promise( (resolve, reject) => {

        const { file } = files;
        const splitName = file.name.split('.');
        const type = splitName[splitName.length -1 ];
    
        //VALIDAR LA EXTENSION

        if (!validTypes.includes( type ) ) {
           return reject(`La extension ${type} no es valida, las extensiones validas son: ${ validTypes }`)
        };
     
        // Use the mv() method to place the file somewhere on your server
        
        const temporalName = uuidv4()+ '.' + type;    
        const uploadPath = path.join( __dirname, '../uploads/', dirname ,temporalName );
        
        file.mv(uploadPath,( err ) => {
            if ( err ) {
                reject( err)
            }
            resolve( uploadPath );
        });

    });
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

}


module.exports = {
    uploadArchive,
}