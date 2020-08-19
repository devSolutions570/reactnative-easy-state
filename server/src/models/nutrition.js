  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NutritionSchema = new Schema({
  dessertName: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
});

module.exports = Item = mongoose.model('item', NutritionSchema);