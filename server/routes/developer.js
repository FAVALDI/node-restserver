//import express instance//
const express = require('express');
const app = express();




app.get('/developers', function(req, res) {
    res.json('get Developers')
})

app.post('/developers', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'

        });
    } else {

        res.json({
            persona: body
        });
    }



})

app.put('/developers/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/developers', function(req, res) {
    res.json('delete Developers')
})