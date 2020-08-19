'use strict';

const Nutrition = require('../models/nutrition');

class NutritionRepository {
    constructor() {
        this.nutritions = new Map([]);
    }

    getById(id) {
        console.log('calling model get by id...')
        return Nutrition.find({_id: id});
    }

    getAll() {
        return Nutrition.find({})
            .then((items) => {
                return items;
            })
            .catch((error) => {
                return { error: "no Item found"}
            })
    }

    delete(id) {
        return Nutrition.deleteOne({ _id: id }).then(() => {
            return Nutrition.find()
                .then((items) => {
                    return items;
                })
                .catch((error) => {
                    return { error: "no Item found"}
                })
        })
        .catch(() => {
            return { error: "delete failed"}
        });
    }
    update(nutrition) {
        return Nutrition.findOneAndUpdate({_id: nutrition._id}, nutrition).then((result) => {
            return Nutrition.find()
                .then((items) => {
                    return items;
                })
                .catch((error) => {
                    return { error: "no Item found"}
                })    
        })        
    }
    create(nutrition) {
        const newItem = new Nutrition({
            dessertName: nutrition.dessertName,
            calories: nutrition.calories,
            fat: nutrition.fat,
            carbs: nutrition.carbs,
            protein: nutrition.protein
        });
        
        return newItem.save()
        .then((item) => {
            return Nutrition.find()
                .then((items) => {
                    return items;
                })
                .catch((error) => {
                    return { error: "no Item found"}
                })    
        })
        .catch((error) => {
            return { error: "can not add item"}
        });
    }
}

const nutritionRepository = new NutritionRepository();

module.exports = nutritionRepository;