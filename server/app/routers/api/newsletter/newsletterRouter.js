const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import newsletter-related actions
const { browse, read, add, send } = require("../../../controllers/newsletterActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new item
router.post("/", add);

// Envoyer une newsletter par email
router.post("/send", send);

/* ************************************************************************* */

module.exports = router;
