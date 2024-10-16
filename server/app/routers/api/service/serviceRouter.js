const express = require("express");

const router = express.Router();
const upload = require("../../../middleware/multer");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/serviceActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new service (with image upload)
router.post("/", upload.single("image"), add);

// Route to edit a service (with image upload)
router.put("/:id", upload.single("image"), edit);

// Route to delete a service
router.delete("/:id", destroy);

/* ************************************************************************* */
// Export the router
/* ************************************************************************* */
module.exports = router;