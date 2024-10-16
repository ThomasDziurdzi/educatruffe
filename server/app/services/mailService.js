const nodemailer = require('nodemailer');
require('dotenv').config();

// Création d'un transporteur pour envoyer des emails
const transporter = nodemailer.createTransport({
 
  service: 'gmail',
  auth: {
    // Utilisation des variables d'environnement pour l'authentification
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,   
  },
});

// Fonction pour envoyer un email
const sendMail = (to, subject, content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse de l'expéditeur
    to,                           // Adresse du destinataire
    subject,                      // Sujet de l'email
    text: content,                // Contenu de l'email
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
