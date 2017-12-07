'use strict'
const express = require('express');
const router = express.Router();

const animal = require('../models/animals');

router.get('/:id', function(req, res, next) {
    const idAnimal = req.params.id;

    const promise = animal.findOne({ _id: idAnimal });
    promise.then((result) => {
        const data = {
            animal: result,
        };
        res.json('', data); //que coi va entre ()??????
    });
    promise.catch((error) => {
        next(error);
    });
});

module.exports = router;