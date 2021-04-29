const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuel.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { updateFuelSchema, createFuelSchema } = require('../middleware/validators/fuelValidator.middleware.js');


router.get('/',  awaitHandlerFactory(fuelController.getAllFuelData)); // localhost:3000/api/v1/users
router.get('/id/:id', awaitHandlerFactory(fuelController.getAllFuelDataById)); // localhost:3000/api/v1/users/id/1
router.post('/', createFuelSchema, awaitHandlerFactory(fuelController.createFuelData)); // localhost:3000/api/v1/users
router.patch('/id/:id',  updateFuelSchema, awaitHandlerFactory(fuelController.updateFuelData)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', awaitHandlerFactory(fuelController.deleteFuelData)); // localhost:3000/api/v1/users/id/1


module.exports = router;
