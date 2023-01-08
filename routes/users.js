const express = require('express');
const router = express.Router();

// Import Methods
const { newUser, approveUser } = require('../controllers/usersController');

router.route('/user/new').post(newUser);

router.route('/user/:id').put(approveUser);

module.exports = router;