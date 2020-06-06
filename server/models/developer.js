//=====================================================//
//                  MONGOOSE SCHEMA                    //
//=====================================================//

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    //shows schema parameters
    nombre: {
        type: String,
        required: [true, 'El nombre completo es necesario,']
    },

    email: {

        type: String,
        unique: true, //check for unique user
        required: [true, 'El correo electronico es obligatorio.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },

    tecnologias_conocidas: {
        type: String,
        required: [true, 'Las tecnologias son obligatorias.']

    },
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    link_github: {
        type: String,
        required: [true, 'El link de github es olbigatorio.']
    }


});

//the tojson method always is called when you get list
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