const {
  // connection,
  respond,
  execute,
  executeWithParams,
  executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getAllPorts = async (req, res) => {
  try {
    const sql = `SELECT * FROM ports WHERE port_lat IS NOT NULL AND port_lng IS NOT NULL`;
    const ports = await executeAndRespond(sql, res);
    respond(ports, res);
  } catch (e) {
    errorOut(e, res);
  }
};

// GET ALL PORT DATA FOR THE 'PORT OF (x) PAGE'
//==============================================
const getPortById = async (req, res) => {
  try {
    const portSql = `SELECT * FROM ports WHERE port_id=?`;
    const portData = await executeWithParams(portSql, [req.params.id]);

    const carrierSql = `
      SELECT c.*
      FROM carriers c 
        LEFT JOIN carriers_x_port cx ON c.carrier_id=cx.carrier_id 
      WHERE cx.port_id=? 
      LIMIT 100`;

    const carrierData = await executeWithParams(carrierSql, [req.params.id], res);
    for (const c of carrierData) {
      const con_sql = `SELECT * FROM contacts WHERE carrier_id=?`;
      const con_params = [c.carrier_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }

    const warehouseSql = `
      SELECT w.*
      FROM warehouses w 
        LEFT JOIN warehouses_x_port wx ON w.warehouse_id=wx.warehouse_id 
      WHERE wx.port_id=? 
      LIMIT 100`;
    const warehouseData = await executeWithParams(warehouseSql, [req.params.id], res);

    const resData = {
      carriers: carrierData,
      port: portData[0],
      warehouses: warehouseData,
    };
    respond(resData, res);
  } catch (e) {
    errorOut(e, res);
  }
};

module.exports = {
  getAllPorts,
  getPortById,
};
