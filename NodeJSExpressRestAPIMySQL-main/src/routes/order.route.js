const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createOrderSchema, updateOrderSchema, validateLogin } = require('../middleware/validators/orderValidator.meddleware');


router.get('/',  awaitHandlerFactory(orderController.getAllOrders)); // localhost:3000/api/v1/users
router.get('/id/:id',  awaitHandlerFactory(orderController.getOrderById)); // localhost:3000/api/v1/users/id/1
router.post('/', createOrderSchema, awaitHandlerFactory(orderController.createOrder)); // localhost:3000/api/v1/users
router.patch('/id/:id',  updateOrderSchema, awaitHandlerFactory(orderController.updateOrder)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id',  awaitHandlerFactory(orderController.deleteOrder)); // localhost:3000/api/v1/users/id/1


//router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;