// Needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const regValidate = require('../utilities/classification-validation')
const newInvValidate = require('../utilities/inventory-validation')

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.get("/detail/:inv_Id", utilities.handleErrors(invController.detailsByInvetoryId))
router.get("./new-classification", utilities.handleErrors(invController.buildClassification))
router.get("./new-inventory", utilities.handleErrors(invController.buildInventory))
router.get("/", utilities.handleErrors(invController.invManagement))

router.post(
    "/add-classification",
    regValidate.classificationRule(),
    regValidate.checkRegData,
    utilities.handleErrors(invController.addClassification)
  )

router.post(
    "/add-inventory",
    newInvValidate.inventoryRule(),
    newInvValidate.checkNewInvData,
    utilities.handleErrors(invController.registerNewInventory)
)

module.exports = router;