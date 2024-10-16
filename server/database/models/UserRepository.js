const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation
  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashed_password, phoneNumber, address) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.phoneNumber,
        user.address,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The R of CRUD - Read operations
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

  // The U of CRUD - Edit (Update) operation
  async update(id, user) {
    // Execute the SQL UPDATE query to modify an existing item in the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET firstname = ?, lastname = ?, email = ?, hashed_password = ?, phoneNumber = ?, address = ? 
       WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashed_password,
        user.phoneNumber,
        user.address,
        id,
      ]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  // Edit password
  async updatePassword(id, currentPassword, newPassword) {
    // check if the current password is correct
    const [user] = await this.database.query(
      `SELECT password FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (!user || user.password !== currentPassword) {
      throw new Error("Incorrect current password");
    }

    // update the password
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET password = ? WHERE id = ?`,
      [newPassword, id]
    );

    return result;
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

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }
}

module.exports = UserRepository;
