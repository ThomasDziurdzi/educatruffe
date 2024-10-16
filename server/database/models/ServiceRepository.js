const AbstractRepository = require("./AbstractRepository");

class ServiceRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parent (AbstractRepository)
    // et passer le nom de la table "service" comme configuration
    super({ table: "service" });
  }

  // L'opération de création (Create)
  async create(service) {
    // Exécute la requête SQL INSERT pour ajouter un nouvel élément dans la table "service"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (serviceName, description, servicePrice, duration, image)
      VALUES (?, ?, ?, ?, ?)`,
      [
        service.serviceName,
        service.description,
        service.servicePrice,
        service.duration,
        service.image,
      ]
    );

    // Retourne l'id du nouvel élément inséré
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
    // Exécute la requête SQL SELECT pour récupérer tous les éléments de la table "service"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourne le tableau des éléments
    return rows;
  }

  // L'opération de mise à jour (Update)
  async update(id, service) {
    // Exécute la requête SQL UPDATE pour modifier un élément existant dans la table "service"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET serviceName = ?, description = ?, servicePrice = ?, duration = ?, image = ? WHERE id = ?`,
      [
        service.serviceName,
        service.description,
        service.servicePrice,
        service.duration,
        service.image,
        id,
      ]
    );

    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }

  // L'opération de suppression (Delete)
  async delete(id) {
    // Exécute la requête SQL DELETE pour supprimer un élément de la table "service"
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }
}

module.exports = ServiceRepository;
