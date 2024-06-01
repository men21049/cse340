const pool = require("../database/")

/* ***********************
 * Get all classification data
 * *********************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")   
}

/* *************************
 * Get all inventory items and classification_name by classification_id
 * ************************* */

async function getInventoryByClassificationId(classification_id){
    try{
        const data = await pool.query(
            `SELECT * FROM public.inventory as i
             JOIN public.classification AS c
             ON i.classification_id = c.classification_id
             WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    }catch(error){
        console.error("getclassificationsbyid error " + error)
    }
}

async function getDetailsByInvID(inv_id){
    try{
        const data = await pool.query(
            `SELECT inv_make, inv_model, inv_year, inv_description,
             inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
             FROM public.inventory WHERE inv_id = $1`,
            [inv_id]
        )
        return data.rows
    }catch(error){
        console.error("getDetailByInvID " + error)
    }
}

async function registerNewClassification(classification_name){
    try{
        const data = await pool.query(
            `INSERT INTO public.classification (classification_name ) VALUES($1)`,
            [classification_name]
        )
        return data.rows
    }catch(error){
        console.error("New Classification " + error)
    }
}

async function validateNewClassification(classification_name){
    try{
        const data = await pool.query(
            `SELECT classification_id FROM public.classification WHERE classification_name = $1`,
            [classification_name]
        )
        return data.rows
    }catch(error){
        console.error("New Classification " + error)
    }
}

async function registerNewInventory(inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id){
    try{
        const data = await pool.query(
            `INSERT INTO public.inventory (inv_make,inv_model,inv_description,
                inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,
                inv_color,classification_id)  
                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [inv_make,inv_model,inv_description,inv_image,inv_thumbnail,inv_price,inv_year,inv_miles,inv_color,classification_id]
        )
        console.log("${inv_color}")
        console.log("something" + "${data.rows}")
        return data.rows
    }catch(error){
        console.error("New Inventory " + error)
    }
}

module.exports = {getClassifications, getInventoryByClassificationId, getDetailsByInvID, registerNewClassification, validateNewClassification,registerNewInventory};

