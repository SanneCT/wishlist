const router = require('express').Router();
const { addWish, deleteWish, filter } = require('../controllers/wishcontroller');


router.post("/wish", addWish);

router.get('/:username', filter);

router.delete('/deleteWish/:id', deleteWish);

module.exports = router;