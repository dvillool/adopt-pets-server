'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    logo: String,
    name: String,
    description: String,
    adopt: Boolean,
    donate: Boolean,
    volunteers: Boolean,
    Adress: {
        street: String,
        number: Number,
        postalCode: Number,
        telephone: String,
        city: String,
        province: String,
    },
    email: String,
    password: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;