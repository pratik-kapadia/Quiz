const express = require('express');
const router = express.Router();
const Objective = require('../models/objective');

router.get('/', async (req, res) => {
    try {
        const objectives = await Objective.find();
        res.send(objectives);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/ids/:ids', async (req, res) => {
    let ids = [];
    req.params.ids.replace("[", "").replace("]", "").split(',').forEach(function (value) {
        ids.push(+value);
    });

    try {
        const objectives = await Objective.find({
            id: { $in: ids }
        });
        res.send(objectives);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const objective = await Objective.findOne({ id: req.params.id });
        res.send(objective);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/test/:testid', async (req, res) => {
    try {
        const objectives = await Objective.find({ testid: req.params.testid });
        res.send(objectives);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    debugger
    try {
        const id = (await Objective.countDocuments({})) + 1;
        req.body.id = id;
        console.log(id);
        console.log(req.body);
        const saved = await Objective.create(req.body);
        res.send(saved);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id', async (req, res) => {
    debugger
    try {
        const objective = await Objective.findOneAndUpdate(
            { id: req.params.id },
            {
                description: req.body.description,
               // testid: req.body.testid,
                selectedOption: req.body.selectedOption,
                options: req.body.options
            },
            null,
            function (err, doc) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Original Doc : ", doc);
                }
            });

        // const options = await Objective.findOneAndUpdate(
        //     { id: req.params.id },
        //     { $set: {options: req.body.options}},
        //     {new:true},
        //     function (err, doc) {
        //         if (err) {
        //             console.log(err)
        //         }
        //         else {
        //             console.log("Original Doc : ", doc);
        //         }
        //     });

        res.send(objective);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router