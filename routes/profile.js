'use strict';

const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const express = require('express');
const router = express.Router();

const profile = require('../models/users');


/*  (amb :id) Per tenir la informacio de shelters o particulars (++++++endavant)

router.get('/:id', function(req, res, next) {
    res.json({}); //Que coi va aqui? (id de l'user per a que printi??)
});

*/

router.put('/me', function(req, res, next) { // guardar canvis en profile
    const userId = req.user._id;
    const promise = User.findOne({ _id: userId });
    promise.then((result) => {
        result.name = req.body.name;
        result.email = req.body.email;
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

router.get('/animal', ensureLogin.ensureLoggedIn(), (req, res, next) => { //anar a la llista dels meus animals (botó myAnimals)
    //fer busqueda per iduser en tots els animals creats i tornar [{objetanimal}]
    const shelter = req.user._id;
    const promise = Animal.find({ shelter: shelter });
    promise.then((result) => {
        res.json(result); //torne-m'hi... que hi va aqui?? (donde esta la pelotita???)
    });
    promise.catch((error) => {
        next(error);
    });
});

router.post('/animal', (req, res, next) => { //anar a la pagina per afegir o crear un animal de shelter
    const animal = req.body.type;
    const name = req.body.name;

    const newAnimal = new Animal({
        name: name,
        animal: animal,
        shelter: req.user._id
    });

    newAnimal.save((err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

router.put('/animal/:id', function(req, res, next) { //modificar animal
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

router.delete('/animal/:id', function(req, res, next) { //borrar animal
    Animal.findOneAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    })
});

module.exports = router;