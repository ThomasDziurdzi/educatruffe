const AbstractRepository = require("./AbstractRepository");

class NewsletterUserRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "newsletterUser" en configuration
    super({ table: "newsletterUser" });
  }

  // La méthode de création (C de CRUD)
  async create(newsletterUser) {
    // Exécuter la requête SQL INSERT pour ajouter un nouvel élément dans la table "newsletterUser"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userEmail) 
       VALUES (?)`,
      [newsletterUser.userEmail]
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
    // Exécuter la requête SQL SELECT pour récupérer tous les éléments de la table "newsletterUser"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Retourner le tableau d'éléments
    return rows;
  }

  // Méthode de mise à jour (E de CRUD)
  async update(id, newsletterUser) {
    // Exécuter la requête SQL UPDATE pour modifier un élément existant dans la table "newsletterUser"
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET userEmail = ? 
       WHERE id = ?`,
      [newsletterUser.userEmail, id]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }

  // Méthode de suppression (D de CRUD)
  async delete(id) {
    // Exécuter la requête SQL DELETE pour supprimer un élément de la table "newsletterUser"
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }
}

module.exports = NewsletterUserRepository;