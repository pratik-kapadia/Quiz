const express = require('express');
const router = express.Router();
const TestList = require('../models/testlist');

//Gettin call
router.get('/', async (req, res) => {
    try {
        const testlist = await TestList.find();
        res.send(testlist);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    debugger
    try {
        const id = (await TestList.countDocuments({})) + 1;
        req.body.id = id;
        console.log(id);
        console.log(req.body);
        const saved = await TestList.create(req.body);
        res.send(saved);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const test = await TestList.findOne({ id: req.params.id });
        res.send(test);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router