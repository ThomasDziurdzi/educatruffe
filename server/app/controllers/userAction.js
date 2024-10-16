// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.user.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
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
    const updatedUser = req.body;
  
    try {
      // Update the user in the database
      const result = await tables.user.update(id, updatedUser);
  
      // If no rows were updated, respond with HTTP 404 (Not Found)
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        // Respond with HTTP 200 (OK) and the updated item
        res.json({ id, ...updatedUser });
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

  const changePassword = async (req, res, next) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
  
    try {
      // Update the password in the database
      const result = await tables.user.updatePassword(id, currentPassword, newPassword);
  
      // If no rows were updated, respond with HTTP 404 (Not Found)
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send("Mot de passe modifié avec succès");
      }
    } catch (err) {
      if (err.message === "Incorrect current password") {
        res.status(400).send("Mot de passe actuel incorrect");
      } else {
        next(err);
      }
    }
  };

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.user.create(user);

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
      // Delete the user from the database
      const result = await tables.user.delete(id);
  
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

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  changePassword,
  add,
  destroy,
};
