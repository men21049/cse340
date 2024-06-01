const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

 /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.inventoryRule = () => {
    return [
      // Classification name is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid make name."), // on error this message is sent.

      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid model name."), // on error this message is sent.

      body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isInt()
        .isLength({ min: 4 })
        .withMessage("Please provide a valid make name."), // on error this message is sent.

      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid description."), // on error this message is sent.

      body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isDecimal()
        .isLength({ min: 4 })
        .withMessage("Please provide a valid price."), // on error this message is sent.

      body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isDecimal()
        .isLength({ min: 4 })
        .withMessage("Please provide a valid milage."), // on error this message is sent.

      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a valid color."), // on error this message is sent.

    ]
  }

  validate.checkNewInvData = async (req, res, next) => {
    
    const { inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let dropdown = await utilities.buildClassificationList()
      res.render("inventory/add-inventory", {
        errors,
        title: "New Inventory",
        nav,
        dropdown,
        inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id,
      })
      return
    }
    next()
  }

  module.exports = validate