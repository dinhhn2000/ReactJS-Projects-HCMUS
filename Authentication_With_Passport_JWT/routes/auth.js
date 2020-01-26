const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            let { userName, password } = user[0];
            console.log({ userName, password });

            const token = jwt.sign({ userName, password }, '1612107');
            return res.json({ user, token });
        });
    })
        (req, res);
});



module.exports = router;