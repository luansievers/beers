var express = require('express');
var router = express.Router();


var beers = require('../controllers/beers');


router.get('/', beers.findByName);
router.post('/:id', beers.insertRating);


module.exports = router;
