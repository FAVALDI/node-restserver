/*************/

//=======================
//Puerto
//=======================

process.env.PORT = process.env.PORT || 3000;


//=======================
//Entorno
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
//Base de datos
//=======================

let urlDB;
/* if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/test';
} else { */

urlDB = 'mongodb+srv://avalith-user:avalith@cluster0-swjd9.mongodb.net/test?retryWrites=true&w=majority';
//}

process.env.URLDB = urlDB;

//