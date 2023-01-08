const express = require('express');
const router = express.Router();

// Import Methods
const { newProperty, updateProperty, deleteProperty, getProperty, appoveProperty, publishProperty } = require('../controllers/propertiesController');

router.route('/properties/:address').get(getProperty);

router.route('/properties/new/:id').post(newProperty);
router.route('/properties/publish/:id').post(publishProperty);
router.route('/properties/:propertyId/:id').post(updateProperty);

router.route('/properties/:id').put(appoveProperty);

// router.route('').put();

router.route('/properties/:propertyId/:id').delete(deleteProperty);


module.exports = router;