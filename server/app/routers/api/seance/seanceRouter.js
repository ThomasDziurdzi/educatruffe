const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import newsletter-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
  readByUserId,
  browseTaken,
} = require("../../../controllers/seanceAction");

// Route to get a list of items
router.get("/", browse);

// Route to get a list of items with users assiociated
router.get("/taken/", browseTaken);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new item
router.post("/", add);

// Route to update an existing item by ID
router.put("/:id", edit);

// Route to update an existing item by ID
router.put("/taken/:id", edit);

// Route to delete an item by ID
router.delete("/:id", destroy);

// Route pour récupérer les seances d'un utilisateur spécifique
router.get("/user/:userId/taken", readByUserId);

/* ************************************************************************* */

module.exports = router;
