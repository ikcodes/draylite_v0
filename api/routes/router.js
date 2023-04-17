//====================================
// Import models
//====================================
const warehouse = require("../controllers/Warehouse");
const document = require("../controllers/Document");
const comment = require("../controllers/Comment");
const carrier = require("../controllers/Carrier");
const contact = require("../controllers/Contact");
const port = require("../controllers/Port");

//====================================
// Routing
//====================================
const express = require("express");
const router = express.Router();
const BASE_URL = `/api/v0`;

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
router.get(`${BASE_URL}/carriers/:id/contacts`, contact.getContactsByCarrierId);
// router.get(`${BASE_URL}/warehouses/:id/contacts`, contact.getContactsByWarehouseId);
router.get(`${BASE_URL}/warehouses/:id/contacts`, (req, res) => {
  res.json({
    message: "Not yet implemented! Need to add to Contact controller.",
  });
});
router.delete(`${BASE_URL}/contacts/:id`, contact.deleteContact);
router.post(`${BASE_URL}/contacts/create`, contact.addNewContact);
router.put(`${BASE_URL}/contacts/update/:id`, contact.updateContact);

// DOCUMENT ROUTING
//=================
router.post(`${BASE_URL}/documents`, document.uploadDocument);
router.get(`${BASE_URL}/documents/:id`, document.getDocument);
router.get(`${BASE_URL}/carrier/:id/documents`, document.getDocumentsByCarrier);

// COMMENT ROUTING
//=================
router.post(`${BASE_URL}/comments`, comment.addComment);
router.get(`${BASE_URL}/comments/:id`, comment.getComment);
router.get(`${BASE_URL}/carrier/:id/comments`, comment.getCommentsByCarrier);

module.exports = router;
