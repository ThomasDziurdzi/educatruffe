// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const dogs = await tables.dog.readAll();

    // Respond with the items in JSON format
    res.json(dogs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const dog = await tables.dog.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (dog == null) {
      res.sendStatus(404);
    } else {
      res.json(dog);
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
    const updatedDog = req.body;
  
    try {
      // Update the dog in the database
      const result = await tables.dog.update(id, updatedDog);
  
      // If no rows were updated, respond with HTTP 404 (Not Found)
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        // Respond with HTTP 200 (OK) and the updated item
        res.json({ id, ...updatedDog });
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const dog = req.body;

  try {
    // Insert the dog into the database
    const insertId = await tables.dog.create(dog);

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
      // Delete the dog from the database
      const result = await tables.dog.delete(id);
  
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

// Endpoint pour récupérer tous les chiens d'un utilisateur spécifique
const readByUserId = async (req, res, next) => {
    try {
      // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
      const { userId } = req.params;
  
      // Utiliser la méthode readByUserId pour récupérer les chiens associés à cet utilisateur
      const dog = await tables.dog.readByUserId(userId);
  
      // Vérifier si des chiens ont été trouvés
      if (dog.length === 0) {
        res.json([]); 
      } else {
        res.json(dog); // Renvoie les chiens en format JSON
      }
    } catch (err) {
      next(err); // Passe les erreurs au middleware de gestion des erreurs
    }
  }; 

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readByUserId,
};
