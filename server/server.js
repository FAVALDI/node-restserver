/**************REQUIREMENT***************/
require('./config/config');
const express = require('express');
//underscore to allow to update only some fields
const _ = require('underscore');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//by creating Developer, we allow to use its model to save as object of the scheme
const Developer = require('../server/models/developer');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

/****************************************/


/***********ROUTES REST REQUEST**********/
app.use(require('./routes/developer'));
/****************************************/

/*******MONGODB ATLAS CONNECTION***************/
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw new err;
    console.log('MongoDB Connected');
});

/**********************************************/

app.listen(process.env.PORT, () => {

    console.log(`Listening by ${process.env.PORT}`);
})

module.exports = app;