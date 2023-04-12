const {
  // connection,
  respond,
  execute,
  executeWithParams,
  // executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getAllCarriers = async (req, res) => {
  try {
    const sql = `SELECT * FROM carriers LIMIT 100`;
    const carriers = await execute(sql, res);

    // Get these to run in parallel.
    // https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
    for (const c of carriers) {
      const con_sql = `SELECT * FROM contacts WHERE carrier_id=?`;
      const con_params = [c.carrier_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }
    respond(carriers, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const getCarrierById = async (req, res) => {
  try {
    // Get base carrier
    const sql = `SELECT * FROM carriers WHERE carrier_id=?`;
    const params = [req.params.id];
    const carrierData = await executeWithParams(sql, params);

    // Get contacts
    const con_sql = `SELECT * FROM contacts WHERE carrier_id=?`;
    const con_params = [req.params.id];
    const contactsData = await executeWithParams(con_sql, con_params);

    const resData = {
      carrier: carrierData[0],
      contacts: contactsData,
    };
    respond(resData, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const getCarriersByPortId = async (req, res) => {
  try {
    const sql = `
      SELECT c.*
      FROM carriers c 
        LEFT JOIN carriers_x_port cx ON c.carrier_id=cx.carrier_id 
      WHERE cx.port_id=? 
      LIMIT 100`;
    const carriers = await executeWithParams(sql, [req.params.id], res);

    const port = await executeWithParams(`SELECT port_name FROM ports WHERE port_id=?`, [
      req.params.id,
    ]);

    // Get these to run in parallel.
    // https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
    for (const c of carriers) {
      const con_sql = `SELECT * FROM contacts WHERE carrier_id=?`;
      const con_params = [c.carrier_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }

    const resData = {
      carriers: carriers,
      port: port[0],
    };

    respond(resData, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const addNewCarrier = async (req, res) => {
  try {
    if (!req.body.carrier_name || req.body.carrier_preferred < 0) {
      errorOut("Must provide a carrier name AND preferred", res);
      return;
    }

    // Execute insert w/ params
    const params = [
      req.body.carrier_name,
      req.body.carrier_preferred,
      req.body.carrier_overweight,
      req.body.carrier_transload,
      req.body.carrier_hazmat,
    ];

    // Create the new carrier and capture its ID
    const newCarrier = await executeWithParams(
      ` INSERT INTO carriers
        (carrier_name, carrier_preferred, carrier_overweight, carrier_transload, carrier_hazmat)
      VALUES (?, ?, ?, ?, ?)`,
      params,
      res
    );

    // Add bridge record if port id supplied
    if (newCarrier.insertId && req.body.port_id) {
      await executeWithParams(`INSERT INTO carriers_x_port (carrier_id, port_id) VALUES (?, ?)`, [
        newCarrier.insertId,
        req.body.port_id,
      ]);
    }
    respond(newCarrier, res);
  } catch (e) {
    errorOut(e, res);
  }
};

const updateCarrier = async (req, res) => {
  try {
    const carrier_id = req.params.id;
    if (
      !carrier_id ||
      !req.body.carrier_name ||
      // Is there a better way to do this...?
      !(req.body.carrier_preferred === 0 || req.body.carrier_preferred === 1)
    ) {
      errorOut("FAIL. Need carrier_name, carrier_preferred", res);
      return;
    }

    // Execute insert w/ params
    const params = [
      req.body.carrier_name,
      req.body.carrier_preferred,
      req.body.carrier_overweight,
      req.body.carrier_transload,
      req.body.carrier_hazmat,
      carrier_id,
    ];
    await executeAndRespondWithParams(
      ` UPDATE carriers 
        SET carrier_name=?, 
          carrier_preferred=?,
          carrier_overweight=?,
          carrier_transload=?,
          carrier_hazmat=?
        WHERE carrier_id=?`,
      params,
      res
    );
  } catch (e) {
    errorOut(e, res);
  }
};

const deleteCarrier = async (req, res) => {
  try {
    // First get the bridge record
    await executeWithParams(`DELETE FROM carriers_x_port WHERE carrier_id=?`, [req.params.id], res);

    // Then the main record
    await executeAndRespondWithParams(
      `DELETE FROM carriers WHERE carrier_id=?`,
      [req.params.id],
      res
    );
  } catch (e) {
    errorOut(e, res);
  }
};

module.exports = {
  getAllCarriers,
  getCarrierById,
  getCarriersByPortId,
  addNewCarrier,
  updateCarrier,
  deleteCarrier,
};
