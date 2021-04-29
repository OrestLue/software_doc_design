const OilModel = require('../models/oil.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Oil Controller
 ******************************************************************************/
class OilController {
    getAllOilData = async (req, res, next) => {
        let oilDataList = await OilModel.find();
        if (!oilDataList.length) {
            throw new HttpException(404, 'Users not found');
        }


        res.send(oilDataList);
    };

    getOilDataById = async (req, res, next) => {
        const oilData = await OilModel.findOne({ id: req.params.id });
        if (!oilData) {
            throw new HttpException(404, 'Oil data not found');
        }



        res.send(oilData);
    };

    createOilData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await OilModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Oil data was created!');
    };

    updateOilData = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await OilModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteOilData = async (req, res, next) => {
        const result = await OilModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('Oil data has been deleted');
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
module.exports = new OilController;
