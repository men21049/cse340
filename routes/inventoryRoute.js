// Needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

router.use("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.use("/detail/:inv_Id", utilities.handleErrors(invController.detailsByInvetoryId))
router.use("/add-classification", utilities.handleErrors(invController.addClassification))
router.use("/", utilities.handleErrors(invController.invManagement))

router.post()

module.exports = router;