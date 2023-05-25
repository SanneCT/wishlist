const router = require('express').Router();
const { getOwn } = require('../controllers/authenticationController');
const { requireAuth, checkIfHome, checkUser } = require('../middleware/requireAuth');


router.get('/home/:username', checkUser , requireAuth, checkIfHome, getOwn,  );

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/')
});

module.exports = router;