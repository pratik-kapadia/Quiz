const mongoose = require('mongoose');
//const Schema = new mongoose.Schema
const testResultSchema = mongoose.Schema({
    userid: Number,
    testid: Number,
    examdata: [{
        qid: Number,
        selectedOption: Number
    }]
});

module.exports = mongoose.model('testresults', testResultSchema, "testresults");