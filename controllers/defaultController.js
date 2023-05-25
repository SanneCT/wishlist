const User = require('../models/User');

const index = async (req, res, next) => {
    const brukere = await User.find().limit(5).sort({updatedAt: -1})
    
    res.render('index', { brukere });

}

const login = (req, res, next) => {
    res.render('login');
}

const logout = (req, res, next) => {
    res.render('logout');
}

const createuserform = (req, res, next) => {
    res.render('signup')
}


module.exports = {
    index,
    login,
    logout,
    createuserform
}

