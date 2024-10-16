const AbstractRepository = require("./AbstractRepository");

class DogRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "dog" });
  }

  // The C of CRUD - Create operation
  async create(dog) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, dogName, description) 
         VALUES (?, ?, ?)`,
      [dog.userId, dog.dogName, dog.description]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Return the array of items
    return rows;
  }

  // The E of CRUD - Edit (Update) operation
  async update(id, dog) {
    // Execute the SQL UPDATE query to modify an existing item in the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET dogName = ?, description = ? WHERE id = ?`,
      [dog.dogName, dog.description, id]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  // The D of CRUD - Destroy (Delete) operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an item from the "user" table
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE userId = ?`,
      [userId]
    );

    return rows;
  }
}

module.exports = DogRepository;
