/*******REQUERIMIENTOS DE OTROS ARCHIVOS********/
require('./config/config');


/********DECLARACIONES******/
const express = require('express');

//underscore to allow to update only some fields
const _ = require('underscore');

//used to create encryption of it
const bcrypt = require('bcrypt');


//by creating Developer, we allow to use its model to save as object of the scheme
const Developer = require('../server/models/developer');


// Using Node.js `require()`
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
    /*****************************/
    /*****************************/

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//app.use(require('./routes/developer'));


/***********ROUTES**********/

app.get('/developers', function(req, res) {
    //los parametros opcionales caen en query
    // we set from which register we want to list
    let from = req.query.from || 0;
    from = Number(from);
    // we set the max number of registers to display
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //buscamos mediante una condicion, el exec ejecuta el find{}. si esta vacio retorna todos
    //if we want to filter by an parameter we must send: find({parameter:value},'parameter to show')
    Developer.find({ estado: 'true' }, 'nombre email')
        //con skip se salta los N registros    
        .skip(from)
        //damos un limite para la respuesta
        .limit(limite)
        .exec((err, developers) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //response for the requirement
            // we count the number of registers, if we want to know about registers that meet an specific requirement we must use following
            //syntax: count({parameter: value},()=>{})
            Developer.count({ estado: 'true' }, (err, count) => {


                res.json({
                    ok: true,
                    developers,
                    TotalCount: count
                })

            })


        })




})

app.post('/developers', function(req, res) {
    //body contains the info of this post
    let body = req.body;

    let developer = Developer({
        nombre: body.nombre,
        email: body.email,
        // aplicamos la encriptacion sincrona a que no utilice ningun callback.
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    })

    //write the DB with a callback
    developer.save((err, developerDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //developerDB.password = null;



        res.json({
            ok: true,
            developer: developerDB
        });


    });
})

app.put('/developers/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);

    //mediante el comando de mongoose se actualiza esto
    //A.findByIdAndUpdate(id, update, options, callback) // executes en options puede mandar new para que retorne el nuevo objeto actualizado
    Developer.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            developer: userDB
        })

    })


})

app.delete('/developers/:id', function(req, res) {

    let id = req.params.id;
    let changeStatus = { estado: 'false' };


    /*
        // OPTION 1: REMOVE ALL INFORMATION ABOUT ID
        Developer.findByIdAndRemove(id, (err, DevDeleted) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!DevDeleted) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Developer not found'
                    }
                });
            }

            res.json({
                ok: true,
                Developer: DevDeleted
            })
        });
    */
    //OPTION 2: JUST CHANGE STATUS OF ID TO FALSE

    Developer.findByIdAndUpdate(id, changeStatus, { new: true }, (err, DevDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!DevDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Developer not found'
                }
            });
        }

        res.json({
            ok: true,
            Developer: DevDeleted
        })

    })


})


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {

    if (err) throw new err;

    console.log('Base de datos ONLINE');
    /*  useNewUrlParser: true,
     useUnifiedTopology: true}, */

});



app.listen(process.env.PORT, () => {

    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})

module.exports = app;