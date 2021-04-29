const DriverModel = require('../models/driver.model.js');
const UserModel = require('../models/user.model.js');

const HttpException = require('../utils/HttpException.utils.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


class DriverController {
    getAllOrders = async(req, res, next) => {
        let orderList = await DriverModel.find();
        let convertedDriverList = [];
        if (!orderList.length) {
            throw new HttpException(404, 'Orders not found');
        }

        orderList.pop();
        res.send(orderList);
    };
    driverLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }
        let isMatch;
        if(pass == user.password){
             isMatch = true;
        }else{
            isMatch =false;
        }
        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
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


module.exports = new DriverController;