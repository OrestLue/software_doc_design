const express = require('express');
const router = express.Router();
const oilController = require('../controllers/oil.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { updateOilSchema, createOilSchema } = require('../middleware/validators/oilValidator.middleware.js');


router.get('/',  awaitHandlerFactory(oilController.getAllOilData));
router.get('/id/:id', awaitHandlerFactory(oilController.getOilDataById)); // localhost:3000/api/v1/users/id/1
router.post('/', createOilSchema, awaitHandlerFactory(oilController.createOilData)); // localhost:3000/api/v1/users
router.patch('/id/:id',  updateOilSchema, awaitHandlerFactory(oilController.updateOilData)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', awaitHandlerFactory(oilController.deleteOilData)); // localhost:3000/api/v1/users/id/1


module.exports = router;
