const {
  // connection,
  respond,
  execute,
  executeWithParams,
  executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getDocument = async (req, res) => {
  try {
    res.json({
      message: `Getting document: ${req.params.id}`,
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

const getDocumentsByCarrier = async (req, res) => {
  try {
    res.json({
      message: `Getting all documents for carrierId: ${req.params.id}`,
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

const uploadDocument = async (req, res) => {
  try {
    if (!req.body.carrier_id) {
      errorOut("Must provide carrier_id", res);
      return;
    }
    res.json({
      message: `Uploading document for ${req.body.carrier_id}. Post body is attached.`,
      postBody: req.body,
    });
    return;

    // We don't always need every field...
    let params = [req.body.carrier_id];
    params.push(req.body.contact_name ? req.body.contact_name : " ");
    params.push(req.body.contact_email ? req.body.contact_email : " ");
    params.push(req.body.contact_phone ? req.body.contact_phone : " ");
    params.push(req.body.contact_notes ? req.body.contact_notes : " ");

    // Execute insert w/ params
    await executeAndRespondWithParams(
      ` INSERT INTO contacts
        (carrier_id, contact_name, contact_email, contact_phone, contact_notes)
      VALUES (?, ?, ?, ?, ?)`,
      params,
      res
    );
  } catch (e) {
    errorOut(e, res);
    return;
  }
};

module.exports = {
  getDocument,
  uploadDocument,
  getDocumentsByCarrier,
};
