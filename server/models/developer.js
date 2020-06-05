const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let enableRoles = {

        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} is not a valid role'
    } // list which contains the allowed roles


let usuarioSchema = new Schema({
    //creamos las propiedades de la base de datos
    nombre: {
        type: String,
        requiered: [true, 'El nombre es necesario']
    },

    email: {

        type: String,
        unique: true, //esto nos comprueba que en la base de datos no exista otra persona con ese correo
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: [false, 'La imagen no es necesaria']
    }, //no es obligatorio
    role: {
        type: String,
        default: 'USER_ROLE',
        //it validates that role meet our list
        enum: enableRoles
    }, // default : 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    google: {
        type: Boolean,
        default: false
    } //boolean


});

//ethe tojson ethod always is call whn you wanna print
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;

}

//tell the scheme to use a plugin to validate
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


//Set a model name as DEVELOPER with the model of usuarioSchema
module.exports = mongoose.model('DEVELOPER', usuarioSchema);