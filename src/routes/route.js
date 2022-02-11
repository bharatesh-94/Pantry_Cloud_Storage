const express = require('express');
const router = express.Router();

// Importing controllers to connect the handlers to respective routes.
const pantryController = require("../controllers/pantryController")
const basketController = require("../controllers/basketController")


//create a pantry for a user using his email ID
router.post('/create', pantryController.createPantry)

//Given a basket name as provided in the url, this will either create a new basket inside your pantry, or replace an existing one.
router.post('/pantry/:PANTRYID/basket/:BASKETNAME', basketController.createBasket)

//Given a PantryID, return the details of the pantry, including a list of baskets currently stored inside it.
router.get('/pantry/:PANTRYID', pantryController.getAllPantryDetails )

//Given a basket name, return the full contents of the basket.
router.get('/pantry/:PANTRYID/basket/:BASKETNAME', basketController.basketDetails);

//Given a basket name, this will update the existing contents and return the contents of the newly updated basket.
router.put('/pantry/:PANTRYID/basket/:BASKETNAME', basketController.updateBasket);

//Delete the entire basket. Warning, this action cannot be undone.
router.delete('/pantry/:PANTRYID/basket/:BASKETNAME', basketController.deleteBasket);

module.exports = router;