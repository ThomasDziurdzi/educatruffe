## Création d'un service de gestion de fichiers avec Multer

Multer est un middleware pour Node.js qui facilite le traitement des fichiers téléchargés via des formulaires. Il est particulièrement utile pour gérer le téléchargement d'images et d'autres fichiers. Lorsqu'un utilisateur soumet un formulaire contenant des fichiers, Multer les traite et les enregistre dans un répertoire spécifique sur le serveur, garantissant ainsi que les fichiers sont correctement stockés et accessibles pour des opérations ultérieures.

1. Configuration de Multer

Avant d'utiliser Multer, il faut le configurer pour spécifier où et comment les fichiers doivent être stockés. Cela inclut la définition d'un dossier de destination pour les fichiers et la gestion du nom de fichier unique pour chaque upload.
Fichier [multer.js]
Cette configuration permet de stocker les fichiers dans le dossier public/assets/images/ et d'attribuer un nom unique à chaque fichier en utilisant l'horodatage actuel et l'extension originale du fichier.

2. Utilisation de Multer dans les contrôleurs

Les fonctions de contrôleur exploitent Multer pour gérer le téléchargement de fichiers lors des requêtes HTTP. Elles peuvent également utiliser la logique de base de données pour associer un fichier téléchargé à un enregistrement spécifique, par exemple lors de la création ou de la modification d'un service.
Fichier [serviceActions.js]
Ce fichier contient les actions CRUD pour gérer les services (ajout, modification, suppression) et inclut la gestion des fichiers téléchargés via Multer.

Dans ces fonctions :
La fonction add gère l'ajout d'un nouveau service et vérifie si un fichier a été téléchargé. Si oui, il stocke le chemin du fichier dans la base de données.
La fonction edit permet de modifier un service existant et de mettre à jour son image si un nouveau fichier est téléchargé.

3. Routes pour les fichiers téléchargés

Les routes associées aux services incluent Multer pour le traitement des fichiers lors des requêtes POST ou PUT.
Fichier [serviceRoutes.js]
Ce fichier définit les routes de l'API pour gérer les services, incluant les routes qui permettent le téléchargement de fichiers.
Les routes POST et PUT utilisent le middleware upload.single('image') pour gérer le téléchargement d'une seule image à la fois. L'image est ensuite accessible dans le contrôleur via req.file.


## Structure des fichiers pour la gestion des téléchargements


/project-root
│
├── controllers
│   └── serviceActions.js        // Logique des opérations sur les services (CRUD + gestion des fichiers)
│
├── middleware
│   └── multer.js                // Configuration de Multer pour gérer le téléchargement de fichiers
│
├── routes
│   └── serviceRoutes.js         // Routes pour gérer les services et les fichiers uploadés
│
└── database
    └── tables.js                // Accès aux tables de la base de données


## Information complementaire

1. Module path

Le module path est un module intégré de Node.js qui permet de gérer et de manipuler les chemins de fichiers et de répertoires de manière indépendante du système d'exploitation (Windows, macOS, Linux, etc.). Cela garantit que votre code fonctionnera de manière cohérente sur différents systèmes d'exploitation.

<!-- Exemple dans le code :
const path = require("path");

Utilisation dans le code :
const reactBuildPath = path.join(__dirname, "/../../client/dist");
const publicFolderPath = path.join(__dirname, "/../public"); -->


__dirname : représente le répertoire courant où se trouve le fichier app.js.

path.join() : permet de concaténer des segments de chemins de manière sécurisée, en tenant compte des spécificités du système d'exploitation (par exemple, les barres obliques inversées \ sous Windows, les barres obliques / sous Unix).
Dans l'exemple, path.join(__dirname, "/../../client/dist") crée un chemin vers le dossier dist du client, situé deux niveaux au-dessus du répertoire actuel.
path.join(__dirname, "/../public") crée un chemin vers le répertoire public, qui est supposé se trouver un niveau au-dessus du répertoire actuel.

2. Méthode express.static()

express.static() est une fonction d'Express qui permet de servir des fichiers statiques (comme des images, des fichiers CSS, des fichiers JavaScript, etc.) depuis un dossier spécifique sur le serveur.

<!-- Exemple dans le code :
app.use(express.static(reactBuildPath)); -->

express.static() : indique à Express où trouver les fichiers statiques à servir.

Dans l'exemple, reactBuildPath est le chemin vers le dossier où les fichiers statiques du client (par exemple, une application React) sont stockés après avoir été construits. Ces fichiers sont ensuite accessibles aux clients (navigateurs) via l'URL sans avoir besoin de définir une route spécifique pour chacun d'eux.

Quand un utilisateur demande une ressource statique (par exemple, http://monsite.com/static/css/style.css), Express va chercher ce fichier dans le dossier spécifié par reactBuildPath et le renvoyer directement.

<!-- Autre exemple :
app.use(express.static(path.join(__dirname, '../public'))); -->

Ici, express.static() sert des fichiers depuis le répertoire public, qui pourrait contenir des ressources comme des images ou des fichiers CSS utilisés par le serveur ou l'application.

