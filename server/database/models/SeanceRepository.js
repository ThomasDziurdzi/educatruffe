const AbstractRepository = require("./AbstractRepository");

class SeanceRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "seance" en configuration
    super({ table: "seance" });
  }

  // La méthode de création (C de CRUD)
  async create(seance) {
    // Exécuter la requête SQL INSERT pour ajouter un nouvel élément dans la table "seance"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (serviceId, date, hour, dayIndex, hourIndex) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        seance.serviceId,
        seance.date,
        seance.hour,
        seance.dayIndex,
        seance.hourIndex,
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

  async readAllAvailable() {
    // Exécuter la requête SQL SELECT pour récupérer tous les éléments de la table "seance"
    const [rows] = await this.database
      .query(`SELECT ${this.table}.serviceId,${this.table}.id, ${this.table}.date, ${this.table}.hour,${this.table}.dayIndex, ${this.table}.hourIndex
        FROM ${this.table}
        `);
    // Retourner le tableau d'éléments
    return rows;
  }

  async readAll() {
    // Exécuter la requête SQL SELECT pour récupérer tous les éléments de la table "seance"
    const [rows] = await this.database
      .query(`SELECT ${this.table}.serviceId,${this.table}.id, ${this.table}.date, ${this.table}.hour,${this.table}.dayIndex, ${this.table}.hourIndex, dog.dogName, service.serviceName, ${this.table}.userId, ${this.table}.dogId,user.firstName, user.lastName
        FROM ${this.table}
        JOIN dog on ${this.table}.dogId = dog.id
        JOIN user on ${this.table}.userId = user.id
        JOIN service on ${this.table}.serviceId = service.id
        `);

    // Retourner le tableau d'éléments
    return rows;
  }

  //
  // Méthode de mise à jour (E de CRUD)
  async update(id, seance) {
    // Exécuter la requête SQL UPDATE pour modifier un élément existant dans la table "seance"
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET userId = ?, dogId = ?, serviceId = ?, date = ?, hour = ?, dayIndex = ?, hourIndex = ?
       WHERE id = ?`,

      [
        seance.userId,
        seance.dogId,
        seance.serviceId,
        seance.date,
        seance.hour,
        seance.dayIndex,
        seance.hourIndex,
        id,
      ]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }

  async updateTaken(id, seance) {
    // Exécuter la requête SQL UPDATE pour modifier un élément existant dans la table "seance"
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET userId = ?, dogId = ?, serviceId = ?, date = ?, hour = ?, dayIndex = ?, hourIndex = ?, dogName = ?, firstName= ?, lastName = ?
       WHERE id = ?`,
      [
        seance.userId,
        seance.dogId,
        seance.serviceId,
        seance.date,
        seance.hour,
        seance.dayIndex,
        seance.hourIndex,
        seance.dogName,
        seance.firstName,
        seance.lastName,
        id,
      ]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }

  // Méthode de suppression (D de CRUD)
  async delete(id) {
    // Exécuter la requête SQL DELETE pour supprimer un élément de la table "seance"
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT ${this.table}.serviceId,${this.table}.id, ${this.table}.date, ${this.table}.hour, dog.dogName, service.serviceName, user.firstName, user.lastName
        FROM ${this.table}
        JOIN dog on ${this.table}.dogId = dog.id
        JOIN user on ${this.table}.userId = user.id
        JOIN service on ${this.table}.serviceId = service.id
        `,

      [userId]
      // .query(`SELECT ${this.table}.serviceId,${this.table}.id, ${this.table}.date, ${this.table}.hour,${this.table}.dayIndex, ${this.table}.hourIndex, dog.dogName, service.serviceName, user.firstName, user.lastName
      //   FROM ${this.table}
      //   JOIN dog on ${this.table}.dogId = dog.id
      //   JOIN user on ${this.table}.userId = user.id
      //   JOIN service on ${this.table}.serviceId = service.id
      //   `);
    );

    return rows;
  }
}

module.exports = SeanceRepository;
