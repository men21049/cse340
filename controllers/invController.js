const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}
const invDetail = {}

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

invDetail.detailsByInvetoryId = async function(req, res, next){
    const inv_id = req.params.inv_id
    const data = await invModel.getDetailsByInvID(inv_id)
    const grid = await utilities.buildDetailByID(data)
    let nav = await utilities.getNav()
    console.log(data)
    /*const className = data[0].classification_name*/
    res.render("./inventory/details",{
        title: " vehicles",
        nav,
        grid,
    })
}

module.exports = invCont;
