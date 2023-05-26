const router = require('express').Router();
const { addWish, deleteWish, filter, switchIndex } = require('../controllers/wishcontroller');
const { checkUser} = require('../middleware/requireAuth')

router.post("/wish", addWish);

router.post("/switchIndex", checkUser, switchIndex);

router.get('/:username', filter);

router.delete('/deleteWish/:id', deleteWish);


module.exports = router;