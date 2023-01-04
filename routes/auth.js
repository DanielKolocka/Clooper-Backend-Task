const express = require('express');
const router = express.Router();

// Import Methods
const {test} = require('../controllers/authController');

router.route('/test').get(test);

module.exports = router;