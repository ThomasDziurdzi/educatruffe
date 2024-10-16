// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const appointmentRequests = await tables.appointmentRequest.readAll();

    // Respond with the items in JSON format
    res.json(appointmentRequests);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const appointmentRequest = await tables.appointmentRequest.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (appointmentRequest == null) {
      res.sendStatus(404);
    } else {
      res.json(appointmentRequest);
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
    const updatedAppointmentRequest = req.body;
  
    try {
      // Update the appointmentRequest in the database
      const result = await tables.appointmentRequest.update(id, updatedAppointmentRequest);
  
      // If no rows were updated, respond with HTTP 404 (Not Found)
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        // Respond with HTTP 200 (OK) and the updated item
        res.json({ id, ...updatedAppointmentRequest });
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const appointmentRequest = req.body;

  try {
    // Insert the appointmentRequest into the database
    const insertId = await tables.appointmentRequest.create(appointmentRequest);

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
      // Delete the appointmentRequest from the database
      const result = await tables.appointmentRequest.delete(id);
  
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
