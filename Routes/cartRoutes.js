const express = require('express');
const router = express.Router();
const itemController = require('./../Controller/itemController');

router
    .route("/")
    .get(itemController.getAllCart)

router
    .route("/:id")
    .post(itemController.addToCart)

module.exports = router;