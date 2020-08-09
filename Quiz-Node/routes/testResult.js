const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TestResult = require('../models/testResult');
const Objectives = require('../models/objective');
//var ObjectID = require('mongodb').ObjectID;

//Gettin call
router.get('/', async (req, res) => {
    try {
        const testresults = await TestResult.find();
        res.send(testresults);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:userid/:testid', async (req, res) => {
    let testresults = [];
    try {
        testresults = await TestResult.find({ userid: req.params.userid, 'examdata.testid': req.params.testid });
        res.send(testresults);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:userid/:testid/:qid', async (req, res) => {
    let testresults = [];
    try {
        testresults = await TestResult.find({ userid: req.params.userid, 'examdata.testid': req.params.testid, 'examdata.qid': req.params.qid });
        res.send(testresults);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Test List-->' + req.params.id);
});
// router.post('/endresult', async (req,res)={
//     // try {
//     //     TestResult
//     // } catch (error) {

//     // }
// });
router.post('/', async (req, res) => {

    let testResult = new TestResult();
    if (req.body._id === undefined || req.body._id === null || req.body._id === '') {
        testResult._id = new mongoose.mongo.ObjectId();
    }
    else {
        testResult._id = req.body._id;
    }
    testResult.testid = req.body.testid;
    testResult.userid = req.body.userid;
    testResult.examdata = req.body.examdata;

    try {

        let saved;
        saved = await TestResult.findOneAndUpdate(
            {
                _id: testResult._id,
                userid: req.body.userid,
                testid: req.body.testid,
            },
            testResult,
            { upsert: true, new: true });
        console.log('update');

        console.log(saved);
        res.send(saved);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router


/**
 *
 * $lookup

{
  from: 'objectives',
  localField: 'examdata.qid',
  foreignField: 'id',
  as: 'answers'
}

$unwind
{
  path: "$answers"

}

$project

{
  "answers.options":1
}

$unwind

{
  path: "$answers.options"
}

$match

{
  "answers.options.id":1
}
 */