const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Chercher l'utilisateur dans la table `user`
    const user = await tables.user.readByEmailWithPassword(email);

    if (user) {
      // Vérifier le mot de passe de l'utilisateur
      const verified = await argon2.verify(user.hashed_password, password);

      if (verified) {
        delete user.hashed_password;

        // Vérifier si l'utilisateur est un administrateur
        const admin = await tables.admin.readByEmailWithPassword(email);
        const isAdmin = !!admin;

        // Générer un token avec l'information admin
        const token = jwt.sign({ sub: user.id, isAdmin }, process.env.APP_SECRET, { expiresIn: "1h" });

        return res.json({
          token,
          user: {    
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin,
          },
        });
      }
      
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Chercher l'administrateur dans la table `admin` si l'utilisateur n'est pas trouvé
    const admin = await tables.admin.readByEmailWithPassword(email);

    if (admin) {
      // Vérifier le mot de passe de l'administrateur
      const verified = await argon2.verify(admin.hashed_password, password);

      if (verified) {
        delete admin.hashed_password;

        // Générer un token avec l'information admin
        const token = jwt.sign({ sub: admin.id, isAdmin: true }, process.env.APP_SECRET, { expiresIn: "1h" });

        return res.json({
          token,
          user: {    
            id: admin.id,
            email: admin.email,
            name: admin.name,
            isAdmin: true,
          },
        });
      }

      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
