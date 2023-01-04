const express = require('express');
const router = express.Router();

// Import Methods
const { newProperty, updateProperty } = require('../controllers/propertiesController');

// router.route('').get();

router.route('/properties/new').post(newProperty);
router.route('/properties/:id').post(updateProperty);

// router.route('').put();

// router.route('').delete();


module.exports = router;