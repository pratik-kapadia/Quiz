const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
    id: Number,
    // testid: Number,
    description: String,
    selectedOption:String,
    options: [{
        id: Number,
        value: String,
        isCorrect: Boolean
    }]
});

module.exports = mongoose.model('objectives', objectiveSchema, "objectives");