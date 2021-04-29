const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class OrderModel {
    tableName = 'orders';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ id_order, drive_rate, id_final_location, id_passenger, id_start_location , id_vehicle, passenger_number, price }) => {
        const sql = `INSERT INTO ${this.tableName}
        (id_order, drive_rate, id_final_location,  id_passenger,id_start_location, id_vehicle, passenger_number,price) VALUES (?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [id_order, drive_rate, id_final_location, id_passenger, id_start_location , id_vehicle, passenger_number, price]);
        const affectedRows = result ? result.affectedRows : 0;

        return result;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE orders SET ${columnSet} WHERE id_order = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id_order = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new OrderModel;