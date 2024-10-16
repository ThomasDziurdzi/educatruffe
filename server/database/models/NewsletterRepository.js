const AbstractRepository = require("./AbstractRepository");

class NewsletterRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "newsletter" });
  }

  // The C of CRUD - Create operation

  async create(newsletter) {
    // Execute the SQL INSERT query to add a new item to the "newsletter" table
    const [result] = await this.database.query(
      `insert into ${this.table} (letter) values(?)`,
      [newsletter.letter]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

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
    // Execute the SQL SELECT query to retrieve all items from the "newsletter" table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    // return the array of items
    return rows;
  }
}

module.exports = NewsletterRepository;
