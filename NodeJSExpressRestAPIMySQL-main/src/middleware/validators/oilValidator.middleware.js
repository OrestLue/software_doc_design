const { body, check } = require('express-validator');


exports.createOilSchema = [
    check('level')
        .exists()
        .withMessage('Fuel level is required'),
    check('measure_time')
        .exists()
        .withMessage('Measure Time is required'),
    check('longitude')
        .exists()
        .withMessage('longitude is required'),
    check('latitude')
        .exists()
        .withMessage('latitude is required')
];

exports.updateOilSchema = [
    check('level')
        .exists()
        .withMessage('Fuel level is required'),
    check('measure_time')
        .exists()
        .withMessage('Measure Time is required'),
    check('longitude')
        .exists()
        .withMessage('longitude is required'),
    check('latitude')
        .exists()
        .withMessage('latitude is required'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = [ 'level', 'measure_time', 'longitude', 'latitude'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

