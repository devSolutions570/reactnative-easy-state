'use strict';

var express = require('express');
// var router = app.Router();
const nutritionRepo = require('../controllers/nutritionControl');

var app = express()
/* GET users listing. */
app.get('/get/:id', (req, res) => {
    console.log("get api calling.")
    const result = nutritionRepo.getById(req.params.id).then((result)=> {
        res.send(result)
    });
})
app.get('/all', (req, res) => {
    const result = nutritionRepo.getAll().then((result) => {
        res.send(result);
    });
})
app.get('/delete/:id', (req, res) => {
    console.log("remove api calling.")
    nutritionRepo.delete(req.params.id).then((result) => {
        console.log(result)
        res.send(result);
    });
})
app.post('/save', (req, res) => {
    const nutrition = req.body;
    if (nutrition._id != undefined) {
        nutritionRepo.getById(nutrition._id).then((result)=> {
            if ( result !== {}) {
                nutritionRepo.update(nutrition).then((result) => {
                    res.send(result);
                });        
            } else {
                nutritionRepo.create(nutrition).then((result) => {
                    res.send(result);
                });   
            }
        });    
    } else {
        nutritionRepo.create(nutrition).then((result) => {
            res.send(result);
        });
    }
});

module.exports = app;