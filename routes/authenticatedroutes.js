const router = require('express').Router();
const { requireAuth, ifHome } = require('../middleware/requireAuth');


router.get('/home/:username', requireAuth, ifHome, (req, res) => {
    res.render('home');
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/')
});

module.exports = router;