const router = require('express').Router();

//Controllers for default routes
const { index, login, createuserform } = require('../controllers/defaultController');
const { loginUser, createuser } = require('../controllers/authenticationController');

router.get('/', index); 

router.get('/login', login);

router.post('/login', loginUser);

router.get('/signup', createuserform);

router.post('/signup', createuser);



module.exports = router;