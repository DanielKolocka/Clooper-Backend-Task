const express = require('express');
const router = express.Router();

// Import Methods
const { newProperty, updateProperty, deleteProperty } = require('../controllers/propertiesController');

// router.route('').get();

router.route('/properties/new').post(newProperty);
router.route('/properties/:id').post(updateProperty);

// router.route('').put();

router.route('/properties/:id').delete(deleteProperty);


module.exports = router;