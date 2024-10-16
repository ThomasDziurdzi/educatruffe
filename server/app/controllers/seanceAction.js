// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const seances = await tables.seance.readAllAvailable();

    // Respond with the items in JSON format
    res.json(seances);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseTaken = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const seances = await tables.seance.readAll();

    // Respond with the items in JSON format
    res.json(seances);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const seance = await tables.seance.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (seance == null) {
      res.sendStatus(404);
    } else {
      res.json(seance);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Destructure the item ID from the request parameters and the updated data from the request body
  const { id } = req.params;
  const updatedSeance = req.body;

  try {
    // Update the seance in the database
    const result = await tables.seance.update(id, updatedSeance);

    // If no rows were updated, respond with HTTP 404 (Not Found)
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      // Respond with HTTP 200 (OK) and the updated item
      res.json({ id, ...updatedSeance });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const editTaken = async (req, res, next) => {
  // Destructure the item ID from the request parameters and the updated data from the request body
  const { id } = req.params;
  const updatedSeance = req.body;

  try {
    // Update the seance in the database
    const result = await tables.seance.updateTaken(id, updatedSeance);

    // If no rows were updated, respond with HTTP 404 (Not Found)
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      // Respond with HTTP 200 (OK) and the updated item
      res.json({ id, ...updatedSeance });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const seance = req.body;

  try {
    // Insert the seance into the database
    const insertId = await tables.seance.create(seance);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Destructure the item ID from the request parameters
  const { id } = req.params;

  try {
    // Delete the seance from the database
    const result = await tables.seance.delete(id);

    // If no rows were deleted, respond with HTTP 404 (Not Found)
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      // Respond with HTTP 204 (No Content) indicating successful deletion
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Endpoint pour récupérer toute les séances d'un utilisateur spécifique
const readByUserId = async (req, res, next) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const { userId } = req.params;

    // Utiliser la méthode readByUserId pour récupérer les seances associés à cet utilisateur
    const seance = await tables.seance.readByUserId(userId);

    // Vérifier si des seances ont été trouvés
    if (seance.length === 0) {
      res.json([]);
    } else {
      res.json(seance); // Renvoie les seances en format JSON
    }
  } catch (err) {
    next(err); // Passe les erreurs au middleware de gestion des erreurs
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  browseTaken,
  read,
  edit,
  editTaken,
  add,
  destroy,
  readByUserId,
};
