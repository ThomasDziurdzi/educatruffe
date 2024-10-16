const express = require("express");

const router = express.Router();

// Importer les modules d'actions utilisateur et d'authentification
const { login} = require("../../../controllers/authAction");
const {  verifyToken } = require("../../../services/auth");

// Route pour la connexion (accessible sans authentification)
router.post("/", login);

// Middleware d'authentification
router.use(verifyToken);


module.exports = router;