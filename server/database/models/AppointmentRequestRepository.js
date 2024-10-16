const AbstractRepository = require("./AbstractRepository");

class AppointmentRequestRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parent (AbstractRepository)
    // et passer le nom de la table "appointmentRequest" comme configuration
    super({ table: "appointmentRequest" });
  }

  // L'opération de création (Create)
  async create(appointmentRequest) {
    // Exécute la requête SQL INSERT pour ajouter un nouvel élément dans la table "appointmentRequest"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (message, userId, date) 
       VALUES (?, ?, ?)`,
      [appointmentRequest.message, appointmentRequest.userId, appointmentRequest.date]
    );

    // Retourne l'ID du nouvel élément inséré
    return result.insertId;
  }

  // L'opération de lecture (Read) par ID
  async read(id) {
    // Exécute la requête SQL SELECT pour récupérer un élément spécifique par son ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne la première ligne du résultat, qui représente l'élément
    return rows[0];
  }

  // L'opération de lecture de tous les éléments
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer tous les éléments de la table "appointmentRequest"
    const [rows] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.message, ${this.table}.userId, ${this.table}.date, user.firstName, user.lastName
       FROM ${this.table}
       JOIN user ON ${this.table}.userId = user.id`
    );

    // Retourne le tableau des éléments
    return rows;
  }

  // L'opération de mise à jour (Update)
  async update(id, appointmentRequest) {
    // Exécute la requête SQL UPDATE pour modifier un élément existant dans la table "appointmentRequest"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET message = ?, userId = ? WHERE id = ?`,
      [appointmentRequest.message, appointmentRequest.userId, id]
    );

    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }

  // L'opération de suppression (Delete)
  async delete(id) {
    // Exécute la requête SQL DELETE pour supprimer un élément de la table "appointmentRequest"
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }
}

module.exports = AppointmentRequestRepository;