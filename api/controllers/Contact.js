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

const getContactsByWarehouseId = async (req, res) => {
  try {
    // Get base carrier
    const sql = `SELECT * FROM contacts_warehouse WHERE warehouse_id=?`;
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

const addNewContactWarehouse = async (req, res) => {
  try {
    if (!req.body.warehouse_id) {
      errorOut("Must provide warehouse_id", res);
      return;
    }
    // We don't always need every field...
    let params = [req.body.warehouse_id];
    params.push(req.body.contact_name ? req.body.contact_name : " ");
    params.push(req.body.contact_email ? req.body.contact_email : " ");
    params.push(req.body.contact_phone ? req.body.contact_phone : " ");
    params.push(req.body.contact_notes ? req.body.contact_notes : " ");

    // Execute insert w/ params
    await executeAndRespondWithParams(
      ` INSERT INTO contacts_warehouse
        (warehouse_id, contact_name, contact_email, contact_phone, contact_notes)
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

const updateContactWarehouse = async (req, res) => {
  try {
    const contact_id = req.params.id;
    if (!req.body.warehouse_id || !contact_id) {
      errorOut("FAIL. Need at least a contact_id and warehouse_id", res);
      return;
    }

    // Build params
    let params = [];
    params.push(req.body.contact_name ? req.body.contact_name : " ");
    params.push(req.body.contact_email ? req.body.contact_email : " ");
    params.push(req.body.contact_phone ? req.body.contact_phone : " ");
    params.push(req.body.contact_notes ? req.body.contact_notes : " ");
    params.push(req.body.warehouse_id);
    params.push(contact_id);

    // Execute insert w/ params
    await executeAndRespondWithParams(
      ` UPDATE contacts_warehouse 
        SET contact_name=?,
        contact_email=?,
        contact_phone=?,
        contact_notes=?,
        warehouse_id=?
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
  getContactsByWarehouseId,
  addNewContact,
  addNewContactWarehouse,
  updateContact,
  updateContactWarehouse,
  deleteContact,
};
