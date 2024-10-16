const sendMail = require("../services/mailService"); // Importer le service d'envoi d'e-mail

// Envoyer un message de contact
const sendContactMessage = async (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;

  // Vérifier si tous les champs requis sont présents
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Construire le contenu de l'e-mail
    const content = `Nom: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`;

    // Envoyer l'e-mail
    await sendMail(process.env.EMAIL_USER, 'Nouveau message de contact', content);

    // Répondre avec un message de succès
    return res.status(200).json({ message: "Message envoyé avec succès!" });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error);
    return next(error); 
  }
};


module.exports = {
  sendContactMessage,
};
