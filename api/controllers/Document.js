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
const { storage } = require("@serverless/cloud");

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
    if (!req.params.id) {
      return res
        .status(400)
        .send("Could not get docs by carrier! Please provide all necessary params.");
    }
    const carrierDir = `carrierData/carrier${req.params.id}`;

    const allFiles = [];
    const pages = await storage.list(carrierDir, { recursive: true, pageSize: 100 });
    for await (const page of pages) {
      allFiles.push(...page);
    }

    const carrierFiles = [];

    for await (file of allFiles) {
      const downloadUrl = await storage.getDownloadUrl(`${carrierDir}/${file}`);
      const thisFile = {
        filename: file,
        url: downloadUrl,
      };
      carrierFiles.push(thisFile);
    }
    return res.status(200).send(carrierFiles);
  } catch (e) {
    errorOut(e, res);
  }
};

const uploadDocument = async (req, res) => {
  try {
    return res.status(400).send("Not implemented at this route");
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getDocument,
  uploadDocument,
  getDocumentsByCarrier,
};
