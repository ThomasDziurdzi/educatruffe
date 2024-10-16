// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const services = await tables.service.readAll();
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const service = await tables.service.read(req.params.id);
    if (service == null) {
      res.sendStatus(404);
    } else {
      res.json(service);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { id } = req.params;
  const updatedService = req.body;

  // Handle file upload
  const fileUpload = req.file ? `/assets/images/${req.file.filename}` : null;

  try {
    const dataToUpdate = fileUpload ? { ...updatedService, image: fileUpload } : updatedService;

    const result = await tables.service.update(id, dataToUpdate);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ id, ...dataToUpdate });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const service = req.body;
  const fileUpload = req.file ? `/assets/images/${req.file.filename}` : null;

  try {
    const insertId = await tables.service.create({ ...service, image: fileUpload });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await tables.service.delete(id);

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
