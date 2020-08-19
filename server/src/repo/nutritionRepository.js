'use strict';

const Nutrition = require('../json/nutrition');

class NutritionRepository {
    constructor() {
        this.nutritions = new Map([]);
    }

    getById(id) {
        // return this.nutritions.get(id);
    }

    getAll() {
        // return Array.from(this.nutritions.values());
    }

    remove() {
        // const keys = Array.from(this.nutritions.keys());
        // this.nutritions.delete(keys[keys.length - 1]);
    }

    save(nutrition) {
        if (this.getById(nutrition.id) !== undefined) {
            this.nutritions[nutrition.id] = nutrition;
            return "Updated Person with id=" + nutrition.id;
        }
        else {
            this.nutritions.set(person.id, nutrition);
            return "Added Person with id=" + nutrition.id;
        }
    }
}

const nutritionRepository = new NutritionRepository();

module.exports = nutritionRepository;