const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(decodedToken)
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
            }
            next();
        })
    } else {
        res.locals.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jwt exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

const ifHome = (req, res, next) => {
    const searchedUsername = req.params.username;
    const loggedInUser = res.locals.user.username;

    if (searchedUsername === loggedInUser) {
        next()

    } else {
        res.redirect('/')

        next()
    }
}

module.exports = { checkUser, requireAuth, ifHome };
