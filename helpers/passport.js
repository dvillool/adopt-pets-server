const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user').User;

function configurePassport() {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        user = user ? new User(user) : null;
        done(null, user);
    });

    passport.use(new LocalStrategy((email, password, next) => {
        User.findOne({
            email
        }, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!email) {
                return next(null, false, {
                    message: 'Incorrect email'
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, {
                    message: 'Incorrect password'
                });
            }

            return next(null, user);
        });
    }));

    return passport;
}

module.exports = configurePassport;