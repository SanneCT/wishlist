const router = require('express').Router();
const { addWish, deleteWish, filter, test, } = require('../controllers/wishcontroller');
const { checkUser} = require('../middleware/requireAuth')

router.post("/wish", addWish);

router.post("/test", checkUser, test);

router.get('/:username', filter);

router.delete('/deleteWish/:id', deleteWish);

// router.put('/updateWish/:id', updateWish);

module.exports = router;