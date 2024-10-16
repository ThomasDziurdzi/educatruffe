// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const commentaire = await tables.commentaire.readAll();

    // Respond with the items in JSON format
    res.json(commentaire);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific commentaire from the database based on the provided ID
    const commentaire = await tables.commentaire.read(req.params.id);

    // If the commentaire is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the commentaire in JSON format
    if (commentaire == null) {
      res.sendStatus(404);
    } else {
      res.json(commentaire);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Destructure the commentaire ID from the request parameters and the updated data from the request body
  const { id } = req.params;
  const updatedCommentaire = req.body;

  try {
    // Update the user in the database
    const result = await tables.commentaire.update(id, updatedCommentaire);

    // If no rows were updated, respond with HTTP 404 (Not Found)
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      // Respond with HTTP 200 (OK) and the updated item
      res.json({ id, ...updatedCommentaire });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the commentaire data from the request body
  const commentaire = req.body;

  try {
    // Insert the commentaire into the database
    const insertId = await tables.commentaire.create(commentaire);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// the D of BREAD - destroy (delete)
const destroy = async (req, res, next) => {
  // Desctructure commentaire id from request params
  const { id } = req.params;

  try {
    // delete commentaire from database
    const result = await tables.commentaire.delete(id);

    // if no rows found to be deleted => 404
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
