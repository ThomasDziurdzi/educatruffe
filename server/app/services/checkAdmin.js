const jwt = require('jsonwebtoken');

// vérifier si l'utilisateur est un administrateur.
const checkAdmin = async (req, res, next) => {
  // Récupération du token JWT à partir des en-têtes de la requête.
  const token = req.headers.authorization?.split(' ')[1];

  // Si aucun token n'est fourni, renvoie une réponse 401 (non autorisé).
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Vérification et décodage du token JWT.
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) {
          reject(err); // En cas d'erreur, on rejette la promesse.
          return;
        }
        resolve(decoded); // Si le token est valide, on résout la promesse avec les données décodées.
      });
    });

    // Vérification si le token décodé contient l'attribut isAdmin.
    if (decodedToken && decodedToken.isAdmin) {
      return next(); // Si l'utilisateur est un administrateur, on passe au middleware suivant.
    }


    return res.status(403).json({ message: "Access denied" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = checkAdmin;
