const FuelModel = require('../models/fuel.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Fuel Controller
 ******************************************************************************/
class FuelController {
    getAllFuelData = async (req, res, next) => {
        let fuelSensorList = await FuelModel.find();
        if (!fuelSensorList.length) {
            throw new HttpException(404, 'fuel data not found');
        }

        res.send(fuelSensorList);
    };

    getAllFuelDataById = async (req, res, next) => {
        const fuel = await FuelModel.findOne({ id: req.params.id });
        if (!fuel) {
            throw new HttpException(404, 'User not found');
        }

        res.send(fuel);
    };


    createFuelData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await FuelModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Fuel data was created!');
    };

    updateFuelData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await FuelModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Fuel data not found' :
            affectedRows && changedRows ? 'Fuel data updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteFuelData = async (req, res, next) => {
        const result = await FuelModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('Fuel Data has been deleted');
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
module.exports = new FuelController;
