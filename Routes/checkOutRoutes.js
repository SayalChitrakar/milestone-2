const express = require('express');
const router = express.Router();
const itemController = require('./../Controller/itemController');

router
    .route("/")
    .get(itemController.getAllCheckout)

router
    .route("/:id")
    .post(itemController.checkOut)
module.exports = router;