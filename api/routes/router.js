//====================================
// Import models
//====================================
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

router.get(`${BASE_URL}/are/you/updating`, (req, res) => {
  res.json({
    health: "Yes, I'm updating!",
  });
});

// CARRIER ROUTING
//=================
router.get(`${BASE_URL}/carriers`, carrier.getAllCarriers);
router.get(`${BASE_URL}/carriers/port/:id`, carrier.getCarriersByPortId);
router.get(`${BASE_URL}/carriers/:id`, carrier.getCarrierById);
router.delete(`${BASE_URL}/carriers/:id`, carrier.deleteCarrier);
router.post(`${BASE_URL}/carriers/create`, carrier.addNewCarrier);
router.put(`${BASE_URL}/carriers/update/:id`, carrier.updateCarrier);

// CONTACT ROUTING
//=================
router.get(`${BASE_URL}/carriers/:id/contacts`, contact.getContactsByCarrierId);
router.delete(`${BASE_URL}/contacts/:id`, contact.deleteContact);
router.post(`${BASE_URL}/contacts/create`, contact.addNewContact);
router.put(`${BASE_URL}/contacts/update/:id`, contact.updateContact);

// PORT ROUTING
//=================
router.get(`${BASE_URL}/ports`, port.getAllPorts);

module.exports = router;
