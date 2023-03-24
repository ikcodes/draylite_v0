const {
  // connection,
  respond,
  // execute,
  executeWithParams,
  // executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

const getContactsByCarrierId = async (req, res) => {
  try {
    // Get base carrier
    const sql = `SELECT * FROM contacts WHERE carrier_id=?`;
    const params = [req.params.id];
    const contacts = await executeWithParams(sql, params);
    respond(contacts, res);
    return;
  } catch (e) {
    errorOut(e, res);
    return;
  }
};

const addNewContact = async (req, res) => {
  try {
    if (!req.body.carrier_id) {
      errorOut("Must provide carrier_id", res);
      return;
    }
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

const updateContact = async (req, res) => {
  try {
    const contact_id = req.params.id;
    if (!req.body.carrier_id || !contact_id) {
      errorOut("FAIL. Need at least a contact_id and carrier_id", res);
      return;
    }

    // Build params
    let params = [];
    params.push(req.body.contact_name ? req.body.contact_name : " ");
    params.push(req.body.contact_email ? req.body.contact_email : " ");
    params.push(req.body.contact_phone ? req.body.contact_phone : " ");
    params.push(req.body.contact_notes ? req.body.contact_notes : " ");
    params.push(req.body.carrier_id);
    params.push(contact_id);

    // Execute insert w/ params
    await executeAndRespondWithParams(
      ` UPDATE contacts 
        SET contact_name=?,
        contact_email=?,
        contact_phone=?,
        contact_notes=?,
        carrier_id=?
        WHERE contact_id=?`,
      params,
      res
    );
  } catch (e) {
    errorOut(e, res);
    return;
  }
};

const deleteContact = async (req, res) => {
  try {
    const sql = `DELETE FROM contacts WHERE contact_id=?`;
    const params = [req.params.id];
    await executeAndRespondWithParams(sql, params, res);
  } catch (e) {
    errorOut(e, res);
    return;
  }
};

module.exports = {
  getContactsByCarrierId,
  addNewContact,
  updateContact,
  deleteContact,
};
