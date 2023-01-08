const express = require('express');
const router = express.Router();

// Import Methods
const { newUser, approveUser, deactivateUser } = require('../controllers/usersController');

router.route('/user/new').post(newUser);

router.route('/user/:id').put(approveUser);
router.route('/user/deactivate/:id').put(deactivateUser);

module.exports = router;