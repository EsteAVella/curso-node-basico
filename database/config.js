
const mongoose = require('mongoose');

const dbConnection  = async() =>{

    try {
       
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('base de datos funcionando correctamente')
    }catch(err){
        console.log(err);
        throw new Error('Error a la hora de iniciar la base de datos');

    }
}


module.exports = {
    dbConnection,
}
    