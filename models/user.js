const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    mail:{
        type:String,
        required:[true,"El correo es obligatorio"],
        unique: true,
    },
    password:{
        type:String,
        required:[true,"El correo es obligatorio"]   
    },
    img:{
        type:String,
    },
    rol:{
        type: String,
        required:true,
    },
    state: {
        type:Boolean,
        default:true,
    },
    google: {
        type:Boolean,
        default:false,
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user} = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );