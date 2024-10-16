## Gestion de la sécurité des mots de passe et des tokens JWT 

1. Hachage des mots de passe avec Argon2

Argon2 pour hacher les mots de passe avant de les stocker dans la base de données.
Options de hachage :
memoryCost : Détermine la quantité de mémoire utilisée pendant le hachage, ici définie à 19 Mo.
timeCost : Indique le nombre d'itérations à effectuer pour rendre le hachage plus lent et donc plus résistant aux attaques par force brute.
parallelism : Indique le nombre de threads qui peuvent être utilisés pour le hachage.

2. Vérification du token JWT

JWT : Un format de token sécurisé qui permet de vérifier l'identité de l'utilisateur.
En-tête d'autorisation :
L'en-tête doit être présent et avoir le format Bearer <token>. Si ce n'est pas le cas, une réponse d'erreur 401 (Unauthorized) est renvoyée.
Vérification du token : Le token est vérifié à l'aide d'une clé secrète (définie dans les variables d'environnement). Si le token est valide, l'objet auth est ajouté à la requête pour une utilisation ultérieure.


## Structure des fichiers

1. Contrôleurs d'authentification

Fichier : [authAction.js](server\app\controllers\authAction.js)
Fonction : Ce fichier contient la logique de connexion pour les utilisateurs. Il gère la vérification des identifiants de l'utilisateur, la génération de jetons JWT, et les réponses en cas d'erreur ou de succès lors de la connexion.

2. Services d'authentification

Fichier : [auth.js](server\app\services\auth.js)
Fonction : Ce fichier définit des middlewares pour gérer le hachage des mots de passe et la vérification des tokens JWT. Le hachage est réalisé avec la bibliothèque argon2, et la vérification du token utilise jsonwebtoken.

3. Routes d'authentification

Fichier : [authRouter.js](server\app\routers\api\auth\authRouter.js)
Fonction : Ce fichier définit les routes liées à l'authentification. Il inclut une route pour la connexion et applique le middleware de vérification de token sur les routes qui nécessitent une authentification.

4. Routes utilisateur

Fichier : [userRouter.js](server\app\routers\api\user\userRouter.js)
Fonction : Ce fichier contient les routes liées aux opérations des utilisateurs. Il inclut des routes pour l'ajout, la lecture, la mise à jour et la suppression d'éléments.

## Chemins des fichiers 

│
├── controllers
│   ├── authAction.js           // Logique d'authentification (connexion)
│   └── userAction.js           // Logique des opérations utilisateur
│
├── services
│   └── auth.js                 // Middleware pour l'authentification (hash, verify token)
│
├── routes
│   ├── auth
│   │                           // Routes d'authentification
│   └── user
│                               // Routes utilisateur
│
└── database
    └── tables.js               // Gestion des accès à la base de données (tables)


## Explication du Code

1. Contrôleur d'authentification (authAction.js)

- Fonction login :
Récupère l'email et le mot de passe depuis la requête.
Vérifie si l'utilisateur existe dans la table user et, si ce n'est pas le cas, dans la table admin.
Utilise argon2 pour vérifier le mot de passe haché.
Si les identifiants sont valides, un jeton JWT est généré avec des informations sur l'utilisateur ou l'administrateur.

2. Service d'authentification (auth.js)

- Middleware hashPassword :
Hache le mot de passe de l'utilisateur avant de l'enregistrer dans la base de données.
Supprime le mot de passe en texte clair du corps de la requête pour des raisons de sécurité.

- Middleware verifyToken :
Vérifie l'en-tête d'autorisation dans les requêtes pour s'assurer que l'utilisateur est authentifié.
Si le token est valide, il ajoute les informations de l'utilisateur à la requête pour un accès ultérieur.

3. Routes d'authentification (routes/auth/index.js)

- Route de connexion :
Définit une route POST pour la connexion à l'application.
Applique le middleware login qui traite la connexion des utilisateurs.

- Middleware d'authentification :
Utilise verifyToken pour protéger les routes suivantes, s'assurant que seules les requêtes authentifiées peuvent accéder à ces routes.

4. Routes utilisateur (routes/user/index.js)

- Gestion des routes :
Définit les routes pour obtenir la liste des utilisateurs, lire un utilisateur spécifique, ajouter un nouvel utilisateur (en utilisant le hachage du mot de passe), mettre à jour des informations, et supprimer un utilisateur.







