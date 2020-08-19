'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const config = require('./config');
const app = new express();

// register JSON parser middlewear
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

var nutritionRouter = require('./src/routes/nutritionRoutes');
// require('./src/routes/versionRoutes')(app, config);

app.use('/', nutritionRouter);

app.listen(3000, () => {
    /* eslint-disable */
    console.log("Server is up!");
});