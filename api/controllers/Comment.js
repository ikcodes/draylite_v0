const {
  // connection,
  respond,
  execute,
  executeWithParams,
  executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getComment = async (req, res) => {
  try {
    res.json({
      message: `Getting comment by id (?): ${req.params.id}`,
    });
    /*
    const sql = `SELECT * FROM ports WHERE port_lat IS NOT NULL AND port_lng IS NOT NULL`;
    const ports = await executeAndRespond(sql, res);
    respond(ports, res);
    */
  } catch (e) {
    errorOut(e, res);
  }
};

const getCommentsByCarrier = async (req, res) => {
  try {
    await executeAndRespondWithParams(
      `SELECT * FROM comments WHERE carrier_id=? ORDER BY created_at DESC`,
      [req.params.id],
      res
    );
  } catch (e) {
    errorOut(e, res);
  }
};

const addComment = async (req, res) => {
  try {
    if (!req.body.carrier_id || !req.body.comment) {
      errorOut("Please provide the proper parameters to comment.", res);
      return;
    }

    let params = [req.body.carrier_id];
    params.push(req.body.comment ? req.body.comment : " ");

    // Execute insert w/ params
    await executeAndRespondWithParams(
      ` INSERT INTO comments
        (carrier_id, comment)
      VALUES (?, ?)`,
      params,
      res
    );
  } catch (e) {
    errorOut(e, res);
    return;
  }
};

module.exports = {
  getComment,
  addComment,
  getCommentsByCarrier,
};
