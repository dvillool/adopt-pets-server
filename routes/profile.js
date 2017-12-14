'use strict';

const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Animal = require('../models/animals');

// guardar canvis en profile
router.put('/me', function(req, res, next) {
    const userId = req.user._id;
    const promise = User.findOne({ _id: userId });
    promise.then((user) => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.save((error, user) => {
            if (error) {
                return next(error);
            }
            req.login(user, () => {
                res.json(user);
            });
        });
    });
    promise.catch((error) => {
        return next(error);
    });
});

//anar a la llista dels meus animals (botó myAnimals)
//fer busqueda per iduser en tots els animals creats i tornar [{objetanimal}]
router.get('/animal', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const shelter = req.user._id;
    const promise = Animal.find({ shelter: shelter });
    promise.then((result) => {
        res.json(result);
    });
    promise.catch((error) => {
        next(error);
    });
});

//crear un animal de shelter
router.post('/animal', (req, res, next) => {
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const urgent = req.body.urgent;
    const adopt = req.body.adopt;
    const donate = req.body.donate;

    const newAnimal = new Animal({
        name: name,
        type: type,
        shelter: req.user._id,
        description: description,
        urgent: urgent,
        adopt: adopt,
        donate: donate
    });

    newAnimal.save((err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

//modificar animal
router.put('/animal/:id', function(req, res, next) {
    const animalId = req.params.id;
    const promise = Animal.findOne({ _id: animalId });
    promise.then((result) => {
        result.name = req.body.name;
        result.type = req.body.type;
        result.save((error, result) => {
            if (error) {
                return next(error);
            }
        });
    });
    promise.catch((error) => {
        return next(error);
    });
});

//borrar animal
router.delete('/animal/:id', function(req, res, next) {
    Animal.findOneAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    })
});

module.exports = router;