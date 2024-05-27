const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * *************************** */
invCont.buildByClassificationId = async function(req, res, next){
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification",{
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.detailsByInvetoryId = async function(req, res, next){
    const inv_id = req.params.inv_Id
    const data = await invModel.getDetailsByInvID(inv_id)
    const grid = await utilities.buildDetailByID(data)
    const vehicle = " " +data[0].inv_make + " " + data[0].inv_model
    let nav = await utilities.getNav()
    res.render("./inventory/details",{
        title: vehicle,
        nav,
        grid,
    })
}

invCont.invManagement =  async function(req, res, next){
    let nav = await utilities.getNav()
    res.render("./inventory/management",{
        title: "Vehicle Management",
        nav, 
    })
}

invCont.addClassification = async function(req, res, next){
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification",{
        title: "Add New Classification",
        nav, 
    })
}

module.exports = invCont;
