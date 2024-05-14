// Needed resources
const express = require("express")
const router = new express.Router()
const invDetail = require("../controllers/invController")

router.get("/detail/:inv_Id",invDetail.detailsByInvetoryId)

module.exports = router;
