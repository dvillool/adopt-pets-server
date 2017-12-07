'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name: String,
    animal: {
        type: String,
        enum: ['cat', 'dog', 'turtle', 'snake', 'shark']
    },
    shelter: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('Animal', animalSchema);

module.exports = User;