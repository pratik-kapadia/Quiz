const mongoose = require('mongoose');

const testListSchema = new mongoose.Schema({
    id: Number,
    title:String,
    description:String,
    duration:String,
    objectiveIds:[]
});

module.exports = mongoose.model('testlist',testListSchema,"testlist");