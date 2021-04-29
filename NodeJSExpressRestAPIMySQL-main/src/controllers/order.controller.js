const OrderModel = require('../models/order.model.js');
const HttpException = require('../utils/HttpException.utils.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/*************************************F*****************************************
 *                              Order Controller
 ******************************************************************************/
class OrderController {
    getAllOrders = async(req, res, next) => {
        let orderList = await OrderModel.find();
        if (!orderList.length) {
            throw new HttpException(404, 'Orders not found');
        }

        // orderList = orderList.map(order => {
        //     const { orderWithoutPassword } = order;
        //     return orderWithoutPassword;
        // });

        res.send(orderList);
    };

    getOrderById = async (req, res, next) => {
        const order = await OrderModel.findOne({ id_order: req.params.id });
        if (!order) {
            throw new HttpException(404, 'Order not found');
        }

        // const { password, ...orderWithoutPassword } = order;

        res.send(order);
    };

    getOrderByorderRate = async (req, res, next) => {
        const order = await OrderModel.findOne({ drive_rate: req.params.drive_rate });
        if (!order) {
            throw new HttpException(404, 'Order not found');
        }

        // const { password, ...orderWithoutPassword } = order;

        res.send(order);
    };

    getCurrentOrder = async (req, res, next) => {
        const { password, ...orderWithoutPassword } = req.currentOrder;

        res.send(orderWithoutPassword);
    };

    createOrder = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await OrderModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Order was created!');
    };

    updateOrder = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await OrderModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Order not found' :
            affectedRows && changedRows ? 'Order updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteOrder = async (req, res, next) => {
        const result = await OrderModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Order not found');
        }
        res.send('Order has been deleted');
    };

    orderLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req.body;

        const order = await OrderModel.findOne({ email });

        if (!order) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, order.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // order matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ order_id: order.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...orderWithoutPassword } = order;

        res.send({ ...orderWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new OrderController;