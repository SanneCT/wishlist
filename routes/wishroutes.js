const router = require('express').Router();
const { addWish, filter } = require('../controllers/wishcontroller');


router.post("/wish", addWish);

router.get('/:username', filter);

module.exports = router;