const {
  // connection,
  respond,
  execute,
  executeWithParams,
  // executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getAllWarehouses = async (req, res) => {
  try {
    res.json({ test: "YAY" });
    const sql = `SELECT * FROM warehouses LIMIT 100`;
    const warehouses = await execute(sql, res);

    // Get these to run in parallel.
    // https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
    /*
    for (const c of warehouses) {
      const con_sql = `SELECT * FROM contacts WHERE warehouse_id=?`;
      const con_params = [c.warehouse_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }
    */
    respond(warehouses, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const getWarehouseById = async (req, res) => {
  try {
    // Get base warehouse
    const sql = `SELECT * FROM warehouses WHERE warehouse_id=?`;
    const params = [req.params.id];
    const warehouse = await executeWithParams(sql, params);

    // Get contacts
    const con_sql = `SELECT * FROM contacts WHERE warehouse_id=?`;
    const con_params = [c.warehouse_id];
    warehouse["contacts"] = await executeWithParams(con_sql, con_params);

    respond(warehouse, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const getWarehousesByPortId = async (req, res) => {
  try {
    const sql = `
      SELECT c.*
      FROM warehouses c 
        LEFT JOIN warehouses_x_port cx ON c.warehouse_id=cx.warehouse_id 
      WHERE cx.port_id=? 
      LIMIT 100`;
    const warehouses = await executeWithParams(sql, [req.params.id], res);

    const port = await executeWithParams(`SELECT port_name FROM ports WHERE port_id=?`, [
      req.params.id,
    ]);

    // Get these to run in parallel.
    // https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
    /*
    for (const c of warehouses) {
      const con_sql = `SELECT * FROM contacts WHERE warehouse_id=?`;
      const con_params = [c.warehouse_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }
    */

    const resData = {
      warehouses: warehouses,
      port: port[0],
    };

    respond(resData, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const addNewWarehouse = async (req, res) => {
  try {
    if (!req.body.warehouse_name || req.body.warehouse_preferred < 0) {
      errorOut("Must provide a warehouse name AND preferred", res);
      return;
    }

    // Execute insert w/ params
    const params = [
      req.body.warehouse_name,
      req.body.warehouse_preferred,
      req.body.warehouse_overweight,
      req.body.warehouse_transload,
      req.body.warehouse_hazmat,
    ];

    // Create the new warehouse and capture its ID
    const newWarehouse = await executeWithParams(
      ` INSERT INTO warehouses
        (warehouse_name, warehouse_preferred, warehouse_overweight, warehouse_transload, warehouse_hazmat)
      VALUES (?, ?, ?, ?, ?)`,
      params,
      res
    );

    // Add bridge record if port id supplied
    if (newWarehouse.insertId && req.body.port_id) {
      await executeWithParams(
        `INSERT INTO warehouses_x_port (warehouse_id, port_id) VALUES (?, ?)`,
        [newWarehouse.insertId, req.body.port_id]
      );
    }
    respond(newWarehouse, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const warehouse_id = req.params.id;
    if (
      !warehouse_id ||
      !req.body.warehouse_name ||
      // Is there a better way to do this...?
      !(req.body.warehouse_preferred === 0 || req.body.warehouse_preferred === 1)
    ) {
      errorOut("FAIL. Need warehouse_name, warehouse_preferred", res);
      return;
    }

    // Execute insert w/ params
    const params = [
      req.body.warehouse_name,
      req.body.warehouse_preferred,
      req.body.warehouse_overweight,
      req.body.warehouse_transload,
      req.body.warehouse_hazmat,
      warehouse_id,
    ];
    await executeAndRespondWithParams(
      ` UPDATE warehouses 
        SET warehouse_name=?, 
          warehouse_preferred=?,
          warehouse_overweight=?,
          warehouse_transload=?,
          warehouse_hazmat=?
        WHERE warehouse_id=?`,
      params,
      res
    );
  } catch (e) {
    errorOut(e, res);
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    // First get the bridge record
    await executeWithParams(
      `DELETE FROM warehouses_x_port WHERE warehouse_id=?`,
      [req.params.id],
      res
    );

    // Then the main record
    await executeAndRespondWithParams(
      `DELETE FROM warehouses WHERE warehouse_id=?`,
      [req.params.id],
      res
    );
  } catch (e) {
    errorOut(e, res);
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  getWarehousesByPortId,
  addNewWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
