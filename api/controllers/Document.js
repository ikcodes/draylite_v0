const {
  // connection,
  respond,
  execute,
  executeWithParams,
  executeAndRespond,
  executeAndRespondWithParams,
} = require("../services/db");
const { errorOut } = require("../utils/utils");

// Serverless Cloud storage: https://www.serverless.com/cloud/docs/apps/blob-storage
// import { storage } from "@serverless/cloud";

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
    // if (!req.body.carrier_id) {
    //   errorOut("Must provide carrier_id", res);
    //   return;
    // }

    // if (!req.body.files) {
    //   errorOut("Must provide a files", res);
    //   return;
    // }

    // const data = req.body.files;

    // const result = await storage.write("/testafterbtoa", data);

    // storage.on("*", async (event) => {
    // reacts to all write/remove events
    // });

    // await storage.write("/your/path/binaryData.ext", req.body);
    return;
    // var form = new multiparty.Form();
    // form.parse(req, function (err, fields, files) {
    // res.json({
    // message: `Uploading document for Carrier ${req.body.carrier_id}. Post body is attached.`,
    // err: err,
    // fields: fields,
    // files: files,
    // postBody: JSON.stringify(req),
    // data: data,
    // result: result,
    // });
    // fields fields fields
    // });

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
    // errorOut(e, res);
    // return;
    res.status(500).send({
      message: e,
    });
  }
};

module.exports = {
  getDocument,
  uploadDocument,
  getDocumentsByCarrier,
};
