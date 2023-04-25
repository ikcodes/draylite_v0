//====================================
// Import models
//====================================
const warehouse = require("../controllers/Warehouse");
const document = require("../controllers/Document");
const comment = require("../controllers/Comment");
const carrier = require("../controllers/Carrier");
const contact = require("../controllers/Contact");
const port = require("../controllers/Port");

// SERVERLESS CLOUD UPLOAD SCRIPTS
const serverless = require("@serverless/cloud");

//====================================
// Routing
//====================================
const express = require("express");
const router = express.Router();
const BASE_URL = `/v0`;

// HEALTH CHECK
//==============
router.get(`${BASE_URL}/health`, (req, res) => {
  res.json({
    health: "Alive!",
  });
});

// PORT ROUTING
//=================
router.get(`${BASE_URL}/ports`, port.getAllPorts);
router.get(`${BASE_URL}/port/:id`, port.getPortById);

// CARRIER ROUTING
//=================
router.get(`${BASE_URL}/carriers`, carrier.getAllCarriers);
router.get(`${BASE_URL}/carriers/port/:id`, carrier.getCarriersByPortId);
router.get(`${BASE_URL}/carriers/:id`, carrier.getCarrierById);
router.delete(`${BASE_URL}/carriers/:id`, carrier.deleteCarrier);
router.post(`${BASE_URL}/carriers/create`, carrier.addNewCarrier);
router.put(`${BASE_URL}/carriers/update/:id`, carrier.updateCarrier);

// WAREHOUSE ROUTING
//=================
router.get(`${BASE_URL}/warehouses`, warehouse.getAllWarehouses);
router.get(`${BASE_URL}/warehouses/port/:id`, warehouse.getWarehousesByPortId);
router.get(`${BASE_URL}/warehouses/:id`, warehouse.getWarehouseById);
router.delete(`${BASE_URL}/warehouses/:id`, warehouse.deleteWarehouse);
router.post(`${BASE_URL}/warehouses/create`, warehouse.addNewWarehouse);
router.put(`${BASE_URL}/warehouses/update/:id`, warehouse.updateWarehouse);

// CONTACT ROUTING
//=================
router.post(`${BASE_URL}/contacts/create`, contact.addNewContact);
router.put(`${BASE_URL}/contacts/update/:id`, contact.updateContact);
router.get(`${BASE_URL}/carriers/:id/contacts`, contact.getContactsByCarrierId);
router.post(`${BASE_URL}/contacts/warehouse/create`, contact.addNewContactWarehouse);
router.put(`${BASE_URL}/contacts/warehouse/update/:id`, contact.updateContactWarehouse);
router.get(`${BASE_URL}/warehouses/:id/contacts`, contact.getContactsByWarehouseId);
router.delete(`${BASE_URL}/contacts/:id`, contact.deleteContact);

// DOCUMENT ROUTING
//=================

router.post(`${BASE_URL}/documents`, document.uploadDocument);
router.get(`${BASE_URL}/documents/:id`, document.getDocument);
router.get(`${BASE_URL}/carrier/:id/documents`, document.getDocumentsByCarrier);

// creates a POST and PUT route at `/upload`
router.post(`${BASE_URL}/upload`, async (req, res) => {
  try {
    const { files } = req;
    if (!files || !files.length) {
      return res.status(400).send("No files uploaded");
    }
    if (!req.body.carrier_id) {
      return res.status(400).send("No carrier_id provided");
    }
    const carrier_id = req.body.carrier_id;

    // Using the filename and path, upload
    const file = files[0];
    const fileName = files[0].originalname;
    const filePath = `/carrierData/carrier${carrier_id}/${fileName}`;
    const writeRes = await serverless.storage.write(filePath, file.buffer, {
      type: file.mimetype,
    });
    return res.send({
      writeRes,
      message: "File uploaded successfully",
    });
  } catch (e) {
    res.status(403).send(e);
  }
});

router.post(`${BASE_URL}/big-upload`, async (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).send("No filename provided");
  }

  const uploadUrl = await serverless.storage.getUploadUrl(filename);

  return res.send({
    uploadUrl,
  });
});

// COMMENT ROUTING
//=================
router.post(`${BASE_URL}/comments`, comment.addComment);
router.post(`${BASE_URL}/comments/warehouse`, comment.addCommentWarehouse);
router.get(`${BASE_URL}/comments/:id`, comment.getComment);
router.get(`${BASE_URL}/carrier/:id/comments`, comment.getCommentsByCarrier);
router.get(`${BASE_URL}/warehouse/:id/comments`, comment.getCommentsByWarehouse);

module.exports = router;
