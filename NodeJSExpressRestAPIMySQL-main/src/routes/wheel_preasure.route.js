const express = require('express');
const router = express.Router();
const wheelPreasureController = require('../controllers/wheel_preasure.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { updateWheelPreasureSchema, createWheelPreasureSchema } = require('../middleware/validators/wheelPreasureValidator.middleware');


router.get('/',  awaitHandlerFactory(wheelPreasureController.getAllWheelPreasureData)); // localhost:3000/api/v1/users
router.get('/id/:id', awaitHandlerFactory(wheelPreasureController.getWheelPreasureDataById)); // localhost:3000/api/v1/users/id/1
router.post('/', createWheelPreasureSchema, awaitHandlerFactory(wheelPreasureController.createWheelPreasureData)); // localhost:3000/api/v1/users
router.patch('/id/:id',  updateWheelPreasureSchema, awaitHandlerFactory(wheelPreasureController.updateWheelPreasureData)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', awaitHandlerFactory(wheelPreasureController.deleteWheelPreasureData)); // localhost:3000/api/v1/users/id/1


module.exports = router;
