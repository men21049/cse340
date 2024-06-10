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
    res.render("inventory/classification",{
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
    res.render("inventory/details",{
        title: vehicle,
        nav,
        grid,
    })
}

invCont.invManagement =  async function(req, res, next){
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()
    res.render("inventory/management",{
        title: "Vehicle Management",
        nav, 
        classificationSelect,
    })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await invModel.getInventoryByClassificationId(classification_id)
    if (invData[0].inv_id) {
      return res.json(invData)
    } else {
      next(new Error("No data returned"))
    }
  }

invCont.buildClassification = async function(req, res, next){
    let nav = await utilities.getNav()
    res.render("inventory/add-classification",{
        title: "Add New Classification",
        nav, 
        errors: null,
    })
}

invCont.addClassification = async function(req, res, next){
    let nav = await utilities.getNav()
    const {classification_name} = req.body
    const data = await invModel.validateNewClassification(classification_name)
    
    if(data.length == 0){

        const regResult = await invModel.registerNewClassification(classification_name)

        if (regResult) {
            req.flash(
                "notice",
                `${classification_name} has been registered as a new classification.`
            )
              res.status(201).render("inventory/add-classification", {
                title: "Add New Classification",
                nav,
                errors:null,
            })
        }
    }
    else{
        req.flash(
            "notice",
            `${classification_name} is already part of the classification list.`
          )
          res.status(201).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors:null,
          })
    }
}

invCont.buildInventory = async function(req,res,next){
    let nav = await utilities.getNav()
    let dropdown = await utilities.buildClassificationList()
    res.render("inventory/add-inventory",{
        title: "Add new Inventory",
        nav, 
        dropdown, 
        errors: null,
    })
}

invCont.registerNewInventory = async function(req, res, next){
    let nav = await utilities.getNav()
    let dropdown = await utilities.buildClassificationList()
    const { inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id } = req.body
    const data = await invModel.registerNewInventory(inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id)
    
    if (data) {
        req.flash(
            "notice",
            `A new inventory was added to the list.`
        )
        res.status(201).render("inventory/add-inventory", {
            title: "Add New Inventory",
            nav,
            dropdown,
            errors:null,
        })
    }
    else{
        req.flash(
            "notice",
            `It looks like a new inventory was not register.`
          )
        res.status(201).render("inventory/add-classification", {
            title: "Add New Inventory",
            nav,
            dropdown, 
            errors:null,
          })
    }
}

module.exports = invCont;
