const router = require('express').Router();
const { requireAuth, ifHome } = require('../middleware/requireAuth');
const { addWish } = require('../controllers/wishcontroller');

router.get('/home/:username', requireAuth, ifHome, (req, res) => {
    res.render('home');
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/')
});



router.post("/wish", addWish);




module.exports = router;