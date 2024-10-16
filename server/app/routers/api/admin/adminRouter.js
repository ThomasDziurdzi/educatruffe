const express = require("express");

const router = express.Router();
const checkAdmin = require('../../../services/checkAdmin');


/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import admin-related actions
const { read } = require("../../../controllers/adminActions");

// Route to get a specific item by ID
router.get("/:id",checkAdmin, read);

/* ************************************************************************* */
module.exports = router;
