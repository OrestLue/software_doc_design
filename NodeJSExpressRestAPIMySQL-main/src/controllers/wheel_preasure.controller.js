const WheelPreasureModel = require('../models/wheel_preasure.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Wheel Preasure Controller
 ******************************************************************************/
class WheelPreasureController {
    getAllWheelPreasureData = async (req, res, next) => {
        let WheelPreasureList = await WheelPreasureModel.find();
        if (!WheelPreasureList.length) {
            throw new HttpException(404, 'Wheel Preasure not found');
        }

        res.send(WheelPreasureList);
    };

    getWheelPreasureDataById = async (req, res, next) => {
        const user = await WheelPreasureModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'Wheel Preasure not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };


    createWheelPreasureData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await WheelPreasureModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Wheel Preasure was created!');
    };

    updateWheelPreasureData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await WheelPreasureModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Wheel Preasure not found' :
            affectedRows && changedRows ? 'Wheel Preasure updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteWheelPreasureData = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Wheel Preasure Data not found');
        }
        res.send('Wheel Preasure has been deleted');
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
module.exports = new WheelPreasureController;
