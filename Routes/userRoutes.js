const express = require('express');
const router = express.Router();
const userController = require("./../Controller/userController");

router
    .route('/signUp')
    .post(userController.signUp)

router
    .route('/login')
    .post(userController.login)

module.exports = router;