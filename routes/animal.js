'use strict'
const express = require('express');
const router = express.Router();

const Animal = require('../models/animals');

router.get('/:id', function(req, res, next) {
    const idAnimal = req.params.id;

    const promise = Animal.findOne({ _id: idAnimal });
    promise.then((result) => {
        res.json(result);
    });
    promise.catch((error) => {
        next(error);
    });
});

router.put('/', function(req, res, next) {
    const animalId = req.body._id;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const urgent = req.body.urgent;
    const adopt = req.body.adopt;
    const donate = req.body.donate;

    const newAnimal = {
        name: name,
        type: type,
        description: description,
        urgent: urgent,
        adopt: adopt,
        donate: donate
    };

    const promise = Animal.findOneAndUpdate({ _id: animalId }, newAnimal);
    promise.then((result) => {
        res.json(result);
    });
    promise.catch((error) => {
        return next(error);
    });
});


module.exports = router;