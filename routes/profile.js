'use strict';

const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const express = require('express');
const router = express.Router();

const profile = require('../models/users');



router.get('/', function(req, res, next) {
    res.json({}); //Que coi va aqui? (id de l'user per a que printi??)
});

router.get('/edit', function(req, res, next) { //anar a editar perfil per a fer canvis
    const data = {
        userId: req.user._id
    }
    res.json('', data); //Que coi va aqui? (id de l'user per a que reempleni el formulari?)
});

router.put('/edit', function(req, res, next) { // guardar canvis en profile

});

router.get('/animal', ensureLogin.ensureLoggedIn(), (req, res, next) => { //anar a la llista dels meus animals (botó myAnimals)
    //fer busqueda per iduser en tots els animals creats i tornar [{objetanimal}]
    const shelter = req.user._id;
    const promise = Animal.find({ shelter: shelter });
    promise.then((result) => {
        const data = {
            animal: result,
        };
        res.json('', data); //torne-m'hi... que hi va aqui?? (donde esta la pelotita???)
    });
    promise.catch((error) => {
        next(error);
    });
});

router.post('/animal/', (req, res, next) => { //anar a la pagina per afegir o crear un animal de shelter
    const animal = req.body.type;

    const newAnimal = new animal({
        name: null,
        animal: animal,
        shelter: req.user._id
    });

    newAnimal.save((err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect(`/animal/${result._id}`);
    });
});

router.put('/animal/:id', function(req, res, next) { //modificar animal

});

router.delete('/animal/:id', function(req, res, next) { //borrar animal

});

module.exports = router;