const sendMail = require('./mailService');
const tables = require('../../database/tables');

// Fonction pour envoyer une newsletter à tous les utilisateurs
const sendNewsletter = async (newsletterId) => {
    try {
      // Récupération de tous les utilisateurs abonnés à la newsletter
      const users = await tables.newsletterUser.readAll();
      // Récupération de la newsletter par son identifiant
      const newsletter = await tables.newsletter.read(newsletterId);
  
      console.info("Utilisateurs:", users);
  
      // Création d'un tableau de promesses pour envoyer les emails
      const sendMailPromises = users.map(user => {
        const email = user.userEmail; // Extraction de l'adresse e-mail de l'utilisateur
        // Vérification si l'utilisateur a une adresse e-mail
        if (!email) {
          console.warn("L'utilisateur n'a pas d'adresse e-mail :", user);
          return Promise.resolve(); // Retourne une promesse résolue si pas d'email
        }
        // Envoi de l'email avec le sujet et le contenu de la newsletter
        return sendMail(email, newsletter.subject, newsletter.letter);
      });
  
      // Attente que toutes les promesses d'envoi d'emails soient résolues
      await Promise.all(sendMailPromises);
      console.info("Toutes les newsletters ont été envoyées !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la newsletter:", error);
    }
  };

module.exports = sendNewsletter;
