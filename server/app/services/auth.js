const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken"); 


const hashingOptions = {
  type: argon2.argon2id, 
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */, 
  timeCost: 2, // Nombre d'itérations du hachage
  parallelism: 1, // Nombre de threads utilisés pour le hachage
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body; // Récupération du mot de passe depuis le corps de la requête
    // Hachage du mot de passe avec les options définies
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword; // Ajout du mot de passe haché au corps de la requête
    delete req.body.password; // Suppression du mot de passe en texte clair
    next(); // Passer au middleware suivant
  } catch (err) {
    next(err); 
  }
};

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization"); // Récupération de l'en-tête d'autorisation

    // Vérification si l'en-tête d'autorisation est présent
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    const [type, token] = authorizationHeader.split(" "); // Décomposition de l'en-tête en type et token

    // Vérification du format de l'en-tête d'autorisation
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid authorization header format" });
    }

    // Vérifier le jeton JWT
    req.auth = jwt.verify(token, process.env.APP_SECRET); 

    
    return next();
  } catch (err) {
    console.error(err); 
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  hashPassword,
  verifyToken,
};
