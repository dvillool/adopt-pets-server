'use strict'
const express = require('express');
const router = express.Router();

const Animal = require('../models/animals');

router.get('/:id', function(req, res, next) {
    const idAnimal = req.params.id;

    const promise = Animal.findOne({ _id: idAnimal });
    promise.then((result) => {
        res.json(result); //que coi va entre ()??????
    });
    promise.catch((error) => {
        next(error);
    });
});

module.exports = router;