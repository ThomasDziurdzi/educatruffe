## Structure du Projet

1. Modèle :

Les modèles (ou repositories) interagissent directement avec la base de données. Chaque modèle est responsable d'une table spécifique dans la base de données et contient des méthodes pour effectuer des opérations CRUD (Create, Read, Update, Delete).
Exemple : UserRepository gère toutes les opérations liées aux utilisateurs, telles que la création, la lecture, la mise à jour et la suppression d'enregistrements.

2. Contrôleur :

Les contrôleurs reçoivent les requêtes HTTP et orchestrent la logique de l'application. Ils appellent les méthodes du modèle pour interagir avec la base de données et renvoient les réponses appropriées au client.
<!-- Exemple : Le contrôleur des utilisateurs (userAction) inclut des fonctions comme browse, read, edit, add, et destroy, chacune correspondant à une opération spécifique. -->

3. Routes :

Les routes définissent comment les requêtes HTTP sont gérées et dirigées vers les contrôleurs appropriés. Chaque route correspond à une opération CRUD.
<!-- Exemple : Dans le fichier de routes des utilisateurs, des routes sont définies pour obtenir tous les utilisateurs (GET /), obtenir un utilisateur spécifique (GET /:id), ajouter un nouvel utilisateur (POST /), mettre à jour un utilisateur (PUT /:id), et supprimer un utilisateur (DELETE /:id). -->


##Exemple de chemin pour la table User 

/user
│
├── controllers
│   ├── userAction.js            // Logique de traitement des requêtes liées aux utilisateurs
│
├── models
│   ├── userRepository.js        // Schéma de la base de données et méthodes liées aux utilisateurs
│
├── routers
│   ├── userRouter.js            // Routes liées aux opérations sur les utilisateurs
│
├── middlewares 
│   ├── auth.js                  // Middleware d'authentification et d'autorisation
│

## Exemples d'opérations

- Parcourir tous les utilisateurs :
La méthode browse dans le contrôleur des utilisateurs récupère tous les utilisateurs de la base de données et les renvoie au format JSON.

- Lire un utilisateur spécifique :
La méthode read utilise l'ID de l'utilisateur fourni dans les paramètres de la requête pour récupérer les détails d'un utilisateur particulier.

- Ajouter un nouvel utilisateur :
La méthode add prend les données d'un nouvel utilisateur du corps de la requête, les insère dans la base de données, et renvoie l'ID de l'utilisateur créé.

- Mettre à jour un utilisateur :
La méthode edit permet de modifier les informations d'un utilisateur existant. Si l'utilisateur n'existe pas, un statut 404 est renvoyé.

- Supprimer un utilisateur :
La méthode destroy supprime un utilisateur de la base de données. Si l'utilisateur n'est pas trouvé, elle renvoie également un statut 404.



## Fonctionnalités spécifiques :

- Proxy pour les tables :

L'utilisation d'un Proxy pour accéder aux tables dans votre application permet d'implémenter un mécanisme de contrôle d'accès centralisé. Cela signifie que toute tentative d'accès à une table non définie déclenche une erreur personnalisée, ce qui renforce la sécurité de votre application en empêchant les accès non autorisés ou indésirables.




