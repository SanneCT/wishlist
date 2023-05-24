const index = (req, res, next) => {
    res.render('index');
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

