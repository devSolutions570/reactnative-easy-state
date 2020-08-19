'use strict';

var express = require('express');
var router = express.Router();
const nutritionRepo = require('../repo/nutritionRepository');

/* GET users listing. */
router
        .get('/get/:id', (req, res) => {
            console.log("get api calling.")
            const id = parseInt(req.params.id);
            const result = nutritionRepo.getById(id);
            res.send(result);
        })
        .get('/all', (req, res) => {
            console.log("get all api calling.")
            const result = nutritionRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            console.log("remove api calling.")
            nutritionRepo.remove();
            const result = 'Last nutrition remove. Total count: '
                + nutritionRepo.nutritions.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            console.log("save api calling.")
            const nutrition = req.body;
            const result = nutritionRepo.save(nutrition);
            res.send(result);
        });

module.exports = router;

// const Router = require('express');
// const nutritionRepo = require('../repo/nutritionRepository');

// const getNutritionRoutes = (app) => {
//     const router = new Router();

//     router
//         .get('/get/:id', (req, res) => {
//             const id = parseInt(req.params.id);
//             const result = nutritionRepo.getById(id);
//             res.send(result);
//         })
//         .get('/all', (req, res) => {
//             console.log("get all success.")
//             const result = nutritionRepo.getAll();
//             res.send(result);
//         })
//         .get('/remove', (req, res) => {
//             nutritionRepo.remove();
//             const result = 'Last nutrition remove. Total count: '
//                 + nutritionRepo.nutritions.size;
//             res.send(result);
//         })
//         .post('/save', (req, res) => {
//             const nutrition = req.body;
//             const result = nutritionRepo.save(nutrition);
//             res.send(result);
//         });

//     app.use('/nutrition', router);
// };

// module.exports = getNutritionRoutes;