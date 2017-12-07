const mongoose = require('mongoose');
const Animal = require('../models/animals');

const animalOne = {
    typeAnimal: 'Cat',
    name: null,
    animal: null,
    shelter: null
}

const animalTwo = {
    typeAnimal: 'Dog',
    name: null,
    animal: null,
    shelter: null
}

const animalThree = {
    typeAnimal: 'Turttle',
    name: null,
    animal: null,
    shelter: null
}

const animalFour = {
    typeAnimal: 'Snake',
    name: null,
    animal: null,
    shelter: null
}

const animalFive = {
    typeAnimal: 'Shark',
    name: null,
    animal: null,
    shelter: null
}

const animals = [animalOne, animalTwo, animalThree, animalFour, animalFive];

Animal.create(animals, (err, docs) => {
    if (err) {
        throw err;
    }

    docs.forEach((animals) => {
        console.log(animals.type);
    });
    mongoose.connection.close();
});