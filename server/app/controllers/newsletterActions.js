// Import access to database tables
const tables = require("../../database/tables");
const sendNewsletter = require("../services/newsletterService");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const newsletters = await tables.newsletter.readAll();

    // Respond with the items in JSON format
    res.json(newsletters);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const newsletter = await tables.newsletter.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (newsletter == null) {
      res.sendStatus(404);
    } else {
      res.json(newsletter);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not needed

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const newsletter = req.body;

  try {
    // Insert the newsletter into the database
    const insertId = await tables.newsletter.create(newsletter);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Fonction pour envoyer une newsletter par email
const send = async (req, res, next) => {
  // Extraction du sujet et du contenu de la requête
  const { subject, content } = req.body; 
  
  // Vérification que le sujet et le contenu sont fournis
  if (!subject || !content) {
    return res.status(400).json({ message: "Le sujet et le contenu sont requis." });
  }

  try {
    // Création d'une nouvelle newsletter dans la base de données
    const newsletterId = await tables.newsletter.create({ subject, letter: content });
    // Envoi de la newsletter aux utilisateurs
    await sendNewsletter(newsletterId);
    return res.status(200).json({ message: "Newsletter envoyée avec succès!" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter:", error);
    return next(error); 
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not needed

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  send,
};
