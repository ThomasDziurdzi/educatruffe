const multer = require("multer");
// Importation de la bibliothèque path pour gérer les chemins de fichiers
const path = require("path");

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({
  // Définition du dossier de destination pour les fichiers téléchargés
  destination: (req, file, cb) => {
    // Appelle la fonction de rappel cb avec null (pas d'erreur) et le chemin du dossier de destination
    cb(null, path.join(__dirname, '../../public/assets/images/')); 
  },
  // Définition du nom de fichier pour les fichiers téléchargés
  filename: (req, file, cb) => {
    // Le nom de fichier sera l'horodatage actuel suivi de l'extension originale du fichier
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Création de l'instance multer avec la configuration de stockage définie
const upload = multer({ storage });


module.exports = upload;
