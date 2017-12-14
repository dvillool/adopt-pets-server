'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const animalSchema = new Schema({
    name: String,
    photos: String,
    description: String,
    type: {
        type: String,
        enum: ['cat', 'dog', 'turtle', 'snake', 'cow', 'sheep', 'hen', 'donkey', 'wolf']
    },
    info: {
        Age: Number,
        sex: String,
        microxip: Boolean,
        steril: Boolean,
    },
    shelter: {
        type: ObjectId,
        ref: 'User'
    },
    urgent: Boolean,
    adopt: Boolean,
    donate: Boolean
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;