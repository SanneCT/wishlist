const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
        
            }
            next();
        })
    } else {
        console.log('else kjører')
        res.locals.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jwt exists & is verified
    if (token) {
        console.log('require auth startet')
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log('decoded token', decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

const checkIfHome = (req, res, next) => {
    const searchedUsername = req.params.username;
    const loggedInUser = res.locals.user.username;
    
    if (searchedUsername === loggedInUser) {
        next()

    } else {
        
        res.redirect('/login')

        next()
    }
}

const notAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        res.redirect("/");
    } else {
        next();
    };
}

module.exports = { checkUser, requireAuth, checkIfHome, notAuth };
