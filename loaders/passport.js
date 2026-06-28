const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/usersModel');
const UserModelInstance = new UserModel();

module.exports = (app) => {
    // Initialize passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    // Find user in DB
                    const user = await UserModelInstance.findUserByEmail(email);

                    // If no user is found, fail auth
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email or password.'})
                    };

                    // Compare password with hashed password in DB
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect email or password' });
                    };

                    // Success - pass user object forward
                    return done(null, user);
                } catch (err) {
                    throw done(err);
                }
            }
        )
    )
}