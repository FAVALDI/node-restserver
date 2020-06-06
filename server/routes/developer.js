//import express instance//
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
//underscore to allow to update only some fields
const _ = require('underscore');


//by creating Developer, we allow to use its model to save as object of the scheme
const Developer = require('../models/developer');


/***********ROUTES REST REQUEST**********/

app.get('/developers', function(req, res) {

    // we set from which register we want to list
    let from = req.query.from || 0;
    from = Number(from);
    // we set the max number of registers to display
    let limite = req.query.limite || 100;
    limite = Number(limite);

    //buscamos mediante una condicion, el exec ejecuta el find{}. si esta vacio retorna todos
    //if we want to filter by an parameter we must send: find({parameter:value},'parameter to show')
    Developer.find({ estado: 'true' }, 'nombre email link_github tecnologias_conocidas')
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
        // apply hash encryption
        password: bcrypt.hashSync(body.password, 10),
        link_github: body.link_github,
        tecnologias_conocidas: body.tecnologias_conocidas

    })

    //write the DB with a callback
    developer.save((err, developerDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            developer: developerDB
        });
    });
})

app.put('/developers/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'tecnologias_conocidas', 'link_github', 'estado']);

    //update database through mongo command
    //A.findByIdAndUpdate(id, update, options, callback) --- executes in options can send back noew object
    Developer.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Developer not found'
                }
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


    //JUST CHANGE STATUS OF ID TO FALSE, to keep its information and just disable the developer

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

module.exports = app;