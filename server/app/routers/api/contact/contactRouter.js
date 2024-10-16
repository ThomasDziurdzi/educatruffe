const express = require("express");

const router = express.Router();
const { sendContactMessage } = require("../../../controllers/contactAction");

// Route pour envoyer le message de contact

router.post("/", sendContactMessage); 

/* ************************************************************************* */

module.exports = router;