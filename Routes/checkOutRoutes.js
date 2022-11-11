const express = require('express');
const router = express.Router();
const itemController = require('./../Controller/itemController');

router
    .route("/")
    .get(itemController.getAllCheckout)

module.exports = router;