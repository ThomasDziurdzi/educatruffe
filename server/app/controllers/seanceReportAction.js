// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const seanceReports = await tables.seanceReport.readAll();

    // Respond with the items in JSON format
    res.json(seanceReports);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const seanceReport = await tables.seanceReport.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (seanceReport == null) {
      res.sendStatus(404);
    } else {
      res.json(seanceReport);
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
    const updatedseanceReport = req.body;
  
    try {
      // Update the seanceReport in the database
      const result = await tables.seanceReport.update(id, updatedseanceReport);
  
      // If no rows were updated, respond with HTTP 404 (Not Found)
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        // Respond with HTTP 200 (OK) and the updated item
        res.json({ id, ...updatedseanceReport });
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const seanceReport = req.body;

  try {
    // Insert the seanceReport into the database
    const insertId = await tables.seanceReport.create(seanceReport);

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
      // Delete the seanceReport from the database
      const result = await tables.seanceReport.delete(id);
  
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
  add,
  destroy,
};
