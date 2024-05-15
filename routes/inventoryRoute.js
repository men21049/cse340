// Needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

router.use("/type/:classificationId", invController.buildByClassificationId)
router.use("/detail/:inv_Id",invController.detailsByInvetoryId)

module.exports = router;