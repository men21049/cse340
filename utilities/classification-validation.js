const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

 /*  **********************************
  *  New Classification Data Validation Rules
  * ********************************* */
validate.classificationRule = () => {
    return [
      // Classification name is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a Classification name.") // on error this message is sent.
    ]
  }

  /* ******************************
 * Check data and return errors or continue to add a new classification
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "New Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }
  
  module.exports = validate