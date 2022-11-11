const express = require("express");
const router = express.Router();

const itemController = require("./../Controller/itemController");
const authController = require("./../Controller/authController");
router
    .route('/')
    .get(authController.checkIfLogin,itemController.getAllItem)
    .post(authController.checkIfLogin,itemController.addItem)


router
    .route('/:id')
    .delete(authController.checkIfLogin,itemController.deleteItem)
    .put(authController.checkIfLogin,itemController.updateItem)

module.exports = router;