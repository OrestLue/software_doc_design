const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class DriverModel {


    find = async (params={}) => {

         
            let sql = `call processorders();`;
            if (!Object.keys(params).length) {
                return await query(sql);
            }
            
        
        return await query(sql);
    }
    findOne = async (params = {}) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM driver
        WHERE ${columnSet} `;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
  
}

module.exports = new DriverModel;