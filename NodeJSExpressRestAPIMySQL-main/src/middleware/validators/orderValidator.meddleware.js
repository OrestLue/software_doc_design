const { body, check } = require('express-validator');



exports.createOrderSchema = [
    check('id_order')
        .exists()
        .withMessage('id_order is required'),
    check('drive_rate')
        .exists()
        .withMessage('drive_rate is required'),
    check('id_final_location')
        .exists()
        .withMessage('id_final_location is required'),
    check('id_passenger')
        .exists()
        .withMessage('id_passenger is required'),
    check('id_start_location')
        .exists()
        .withMessage('id_start_location is required'),
    check('id_vehicle')
        .exists()
        .withMessage('id_vehicle is required'),
    check('passenger_number')
        .exists()
        .withMessage('passenger_number is required'),
    check('price')
        .exists()
        .withMessage('price is required'),
];

exports.updateOrderSchema = [
       check('id_order')
        .exists()
        .withMessage('id_order is required'),
    check('drive_rate')
        .exists()
        .withMessage('drive_rate is required'),
    check('id_final_location')
        .exists()
        .withMessage('id_final_location is required'),
    check('id_passenger')
        .exists()
        .withMessage('id_passenger is required'),
    check('id_start_location')
        .exists()
        .withMessage('id_start_location is required'),
    check('id_vehicle')
        .exists()
        .withMessage('id_vehicle is required'),
    check('passenger_number')
        .exists()
        .withMessage('passenger_number is required'),
    check('price')
        .exists()
        .withMessage('price is required'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id_order', 'drive_rate', 'id_start_location', 'id_final_location', 'id_passenger', 'id_vehicle', 'passenger_number', 'price'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
