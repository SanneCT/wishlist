const router = require('express').Router();
const { requireAuth, ifHome } = require('../middleware/requireAuth');
const { getOwn } = require('../controllers/authenticationController')


router.get('/home/:username', requireAuth, ifHome, getOwn,);

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/')
});

module.exports = router;