## Création d'un service d'envoi d'e-mails (avec Nodemailer)

Nodemailer est un module Node.js qui permet d'envoyer des e-mails de manière simple et efficace. 
Il est souvent utilisé pour les notifications, les confirmations d'inscription ou d'autres communications automatisées.

1. Le transporteur (transporter) créé avec les informations de connexion (via les variables d'environnement).
La fonction sendMail(to, subject, content) pour envoyer les e-mails.
Cela permet d'envoyer des e-mails en spécifiant l'adresse du destinataire, le sujet et le contenu.

2. API pour gérer les newsletters
Dans le fichier newsletterActions.js, tu as défini plusieurs actions pour gérer les newsletters, y compris l'envoi d'une newsletter via la route /send.

Voici les actions importantes :

add : pour créer une nouvelle newsletter et l'ajouter à la base de données.
send : pour envoyer la newsletter par e-mail aux utilisateurs. Dans cette action, tu :
Crées une entrée dans la table newsletter avec le sujet et le contenu.
Utilises la fonction sendNewsletter pour envoyer la newsletter par e-mail à la liste des utilisateurs.

3. API Routes [newsletterRoutes.js]
Ensuite, dans le fichier newsletterRoutes.js, tu as défini les routes de ton API pour gérer les newsletters. La route /send permet d'envoyer une newsletter.

4. Composant React AdminNewsletter
Dans le composant React AdminNewsletter, tu as configuré la logique pour :

Récupérer les adresses e-mail des utilisateurs via un axios.get.
Soumettre le contenu de la newsletter et les adresses e-mail via un axios.post à la route /send.
La fonction handleSubmit envoie les données (adresses e-mail, sujet et contenu) à l'API lorsque l'utilisateur soumet le formulaire.

## Explication globale

Nodemailer est utilisé dans le backend pour envoyer les e-mails via un service Gmail (ou autre SMTP), les informations d'identification sont protégées via des variables d'environnement.
Les routes définissent les endpoints pour récupérer les newsletters, les ajouter à la base de données, et les envoyer par e-mail.
Le composant React utilise ces endpoints pour permettre à un administrateur d'envoyer des newsletters via une interface simple.
Comparaison avec l'authentification (authAction.js)
Le chemin suivi pour envoyer des newsletters est similaire à celui de l'authentification :

[authAction.js] gère les utilisateurs, génère un token JWT et le vérifie avec verifyToken.
newsletterActions.js gère les newsletters, les ajoute à la base de données et envoie les e-mails aux utilisateurs inscrits.
Les deux implémentations utilisent des middlewares pour traiter la logique métier (hashage des mots de passe, envoi de newsletters, etc.) avant de répondre à la requête.

/project-root
│
├── controllers
│   └── newsletterActions.js        // Logique des opérations sur les newsletters (CRUD + envoi)
│
├── services
│   └── mailService.js              // Logique d'envoi d'emails via Nodemailer
│
├── routes
│   └── newsletterRouter
│                                   // Routes pour la gestion des newsletters et l'envoi d'emails
│
└── database
    └── tables.js                   // Accès aux tables de la base de données (newsletter, newsletterUser)


## Structure des fichiers pour l'envoi d'emails

- Contrôleurs pour l'envoi d'emails

Fichier : [newsletterController.js]
Fonction : Ce fichier contient la logique d'envoi des emails. Il gère la réception des requêtes HTTP, la validation des données (par exemple l'adresse email et le contenu), et appelle les services d'envoi d'emails pour effectuer l'envoi. Il peut également gérer des réponses en cas de succès ou d'erreur lors de l'envoi.

<!-- Exemple de fonctions dans ce fichier :
sendNewsletter: envoie une newsletter à une liste d'utilisateurs.
sendContactForm: envoie un email suite à la soumission d'un formulaire de contact. -->

- Services pour l'envoi d'emails

Fichier : [mailService.js]
Fonction : Ce fichier utilise Nodemailer pour configurer un transporteur d'email et définir une fonction générique d'envoi de mails. Il gère la configuration SMTP (via Gmail ou un autre service), et peut être réutilisé pour envoyer des emails avec différents sujets, destinataires et contenus.

<!-- Exemple de fonctions dans ce fichier :
sendMail: fonction générique pour envoyer un email via Gmail. -->


- Routes pour l'envoi d'emails

Fichier : [newsletterRouter.js]
Fonction : Ce fichier contient les routes liées à l'envoi d'emails. Il définit des routes pour envoyer des newsletters, répondre à des soumissions de formulaires de contact, etc. Il utilise les méthodes du contrôleur ([newsletterController.js]) pour traiter les requêtes.

- Configuration des variables d'environnement

Fichier : [.env]
Fonction : Ce fichier contient les variables d'environnement sensibles comme l'adresse email utilisée pour l'envoi, ainsi que le mot de passe ou le mot de passe d'application généré pour sécuriser les accès. Ces variables sont récupérées par le service Nodemailer pour se connecter à Gmail.

<!-- EMAIL_USER=ton-adresse-email@gmail.com    # Adresse Gmail utilisée pour l'envoi
     EMAIL_PASS=mot-de-passe-app               # Mot de passe ou mot de passe d'application généré -->

## Information complementaire 

- Création d'un compte Gmail pour l'envoi de newsletters
1. Créer un compte Gmail
Si tu n’as pas encore de compte Gmail dédié à l’envoi des newsletters, tu peux en créer un sur Google. Ce compte sera utilisé pour envoyer des e-mails via Nodemailer.

2. Autoriser les applications moins sécurisées
Pour utiliser Gmail avec Nodemailer, tu dois activer l’accès pour les "applications moins sécurisées". Voici les étapes pour le faire :

Accéder à ton compte Google :
Va sur myaccount.google.com.
Connecte-toi avec tes identifiants Gmail.
Activer l'accès des applications moins sécurisées :
Va dans "Sécurité" (dans le menu de gauche).
Fais défiler vers le bas et cherche l'option "Accès moins sécurisé des applications".
Active cette option.
Note : Google a commencé à désactiver l'accès pour les applications moins sécurisées pour des raisons de sécurité. Si cela ne fonctionne pas, il est recommandé de configurer OAuth2 ou d’utiliser un mot de passe d’application en activant la vérification en deux étapes (2FA).

3. Configuration avec un mot de passe d’application
Si tu utilises l'authentification à deux facteurs (2FA) dans ton compte Google, tu dois créer un mot de passe d’application.

Activer la vérification en deux étapes :
Toujours dans ton compte Google, va dans "Sécurité".
Dans la section "Se connecter à Google", active la "Validation en deux étapes" (si ce n'est pas déjà fait).
Créer un mot de passe d’application :

Une fois la validation en deux étapes activée, tu peux aller dans la section "Mots de passe des applications".
Sélectionne l’application "Mail" et choisis "Appareil personnalisé" comme type d’appareil.
Garde ce mot de passe d'application à portée de main pour l'utiliser dans Nodemailer.

Ajouter les informations dans le fichier .env
Une fois que ton compte Gmail est prêt, tu dois configurer le fichier .env pour que Nodemailer puisse utiliser les bonnes informations d’authentification.
