const express = require('express');
const router = express.Router();

// Import Methods
const { newProperty } = require('../controllers/propertiesController');

// router.route('').get();

router.route('/properties/new').post(newProperty);

// router.route('').put();

// router.route('').delete();


module.exports = router;