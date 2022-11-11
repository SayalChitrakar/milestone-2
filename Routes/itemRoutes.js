const express = require("express");
const router = express.Router();

const itemController = require("./../Controller/itemController");

router
    .route('/')
    .get(itemController.getAllItem)
    .post(itemController.addItem)


router
    .route('/:id')
    .delete(itemController.deleteItem)
    .put(itemController.updateItem)

module.exports = router;