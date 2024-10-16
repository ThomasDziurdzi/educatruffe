const AbstractRepository = require("./AbstractRepository");

class CalendarRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "calendar" en configuration
    super({ table: "calendar" });
  }

  // La méthode de création (C de CRUD)
  async create(calendar) {
    // Exécuter la requête SQL INSERT pour ajouter un nouvel élément dans la table "calendar"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (serviceId, date, hour, dayIndex, hourIndex) 
       SELECT ?, ?, ?, ?, ?

`,
      [
        calendar.serviceId,
        calendar.date,
        calendar.hour,
        calendar.dayIndex,
        calendar.hourIndex,
        calendar.dayIndex,
        calendar.hourIndex,
      ]
    );

    // Retourner l'ID du nouvel élément inséré
    return result.insertId;
  }

  // Méthode de lecture (R de CRUD)
  async read(id) {
    // Exécuter la requête SQL SELECT pour récupérer un élément spécifique par son ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourner la première ligne du résultat, qui représente l'élément
    return rows[0];
  }

  async readAll() {
    // Exécuter la requête SQL SELECT pour récupérer tous les éléments de la table "calendar"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Retourner le tableau d'éléments
    return rows;
  }

  // Méthode de mise à jour (U de CRUD)
  async update(id, calendar) {
    // Exécuter la requête SQL UPDATE pour modifier un élément existant dans la table "calendar"
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET serviceId = ?, date = ?, hour = ? , dayIndex = ?, hourIndex = ?
       WHERE id = ?`,
      [
        calendar.serviceId,
        calendar.date,
        calendar.hour,
        calendar.dayIndex,
        calendar.hourIndex,
        id,
      ]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }

  // Méthode de suppression (D de CRUD)
  async delete(id) {
    // Exécuter la requête SQL DELETE pour supprimer un élément de la table "calendar"
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }
}

module.exports = CalendarRepository;
