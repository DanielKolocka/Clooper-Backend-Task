const express = require('express');
const router = express.Router();

// Import Methods
const { newProperty, updateProperty, deleteProperty, getProperty } = require('../controllers/propertiesController');

router.route('/properties/:address').get(getProperty);

router.route('/properties/new').post(newProperty);
router.route('/properties/:id').post(updateProperty);

// router.route('').put();

router.route('/properties/:id').delete(deleteProperty);


module.exports = router;