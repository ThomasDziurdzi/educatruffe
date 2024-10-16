const AbstractRepository = require("./AbstractRepository");

class CommentaireRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "commentaire" as configuration
    super({ table: "commentaire" });
  }

  // The C of CRUD - Create operation

  async create(commentaire) {
    // Execute the SQL INSERT query to add a new commentaire to the "commentaire" table

    const [result] = await this.database.query(
      `insert into ${this.table} (serviceId, text, userId, rating, approved) values (?, ?, ?, ?, ?)`,
      [
        commentaire.serviceId,
        commentaire.text,
        commentaire.userId,
        commentaire.rating,
        commentaire.approved,
      ]
    );

    // Return the ID of the newly inserted commentaire
    return result.insertId;
  }

  // async createSeverall(commentaires) {
  //   // Execute the SQL INSERT query to add several new commentaires to the "commentaire" table
  //   const [result] = await this.database.query(
  //     `insert into ${this.table} (serviceId, text, userId, rating, approved) values (?, ?, ?, ?, ?)`,
  //     [
  //       commentaire.serviceId,
  //       commentaire.text,
  //       commentaire.userId,
  //       commentaire.rating,
  //       commentaire.approved,
  //    ]
  //   )
  //   // Return the ID of the newly inserted commentaires
  //   return result.insertId
  //   }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`
      SELECT ${this.table}.id, ${this.table}.serviceId, ${this.table}.text, ${this.table}.userId, ${this.table}.rating, ${this.table}.approved, user.firstName, user.lastName
      FROM ${this.table}
      JOIN user on ${this.table}.userId = user.id
      `);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, commentaire) {
    // Execute the SQL UPDATE query to modify an existing item in the "commentaire" table
    const [result] = await this.database.query(
      `UPDATE ${this.table}
        SET text = ?, rating = ?, approved = ?
        WHERE id = ?`,
      [commentaire.text, commentaire.rating, commentaire.approved, id]
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL delete query to remove an existing item in the "commentaire" table
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = CommentaireRepository;
