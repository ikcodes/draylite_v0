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
    const sql = `SELECT * FROM ports LIMIT 100`;
    const ports = await executeAndRespond(sql, res);
    /*
    // Get these to run in parallel.
    // https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
    for (const c of carriers) {
      const con_sql = `SELECT * FROM contacts WHERE carrier_id=?`;
      const con_params = [c.carrier_id];
      c["contacts"] = await executeWithParams(con_sql, con_params);
    }
    */
    respond(ports, res);
  } catch (e) {
    errorOut(e, res);
  }
};

module.exports = {
  getAllPorts,
};
