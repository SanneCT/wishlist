const router = require('express').Router();

//Controllers for default routes
const { index, login, createuserform } = require('../controllers/defaultController');
const { loginUser, createuser } = require('../controllers/authenticationController');
const { notAuth } = require('../middleware/requireAuth');

router.get('/', index); 

router.get('/login', notAuth, login);

router.post('/login', loginUser);

router.get('/signup', notAuth, createuserform);

router.post('/signup', createuser);



module.exports = router;