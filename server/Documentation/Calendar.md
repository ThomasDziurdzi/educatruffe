# intro

The calendar system was built using a 2d array system.

in order to list disponiblities the database for it was built in this way:

-the grid is created with every time slot unavailable by default.
-using the props of separated components for the vertical and horizontal axis we can locate each position in the slots
-tests are run on load to compare availability depending of the admin's creation of the slots through dashboard on corresponding services
-by selecting and validating a time slot, a user changes this entry in the database

here are the varying parameters of a seance entry in the database:

## 2d grid

the seance table has a hourIndex (y axis) and dayIndex(x axis) value for each row, allowing for a comparison with the grids built using the .map() methode and the react props

## serviceId

each row also have a serviceId to allow the comparison to work depending on the service that the user selects.
this can be accessed by using the req.params function of react-router-dom

## date and hour

Even though these settings are not used in the grid system they are added through the props of the component they come from.
These allow for a check in the database for info if needed for more readability and also to check that they should not be displayed if no one took them but the time is passed already.

## availability

a seance doesn't need to have a userId, user firstName, user lastName or a dogId to be created, however when these are added the admin can check on these scheduled slots. when they are added via the update of the CRUD system they are considered unavailable and won't display for other users.
They will also show up in the user's seance tab either in "passé" or in "à venir" depending on the current time.

# different versions of the calendar

in order to allow the admin to program the time slots every week the calendar component is declined in two versions.

## customer calendar

when the user is checking for services and wants to look for availabilities the calendar compares the parameters via the selection in the services pages, which is linked to the service table to allow for the calendar to be functionnal on new admin services without any need for the webmaster's input. the user is redirected to the calendar page with the corresponding service id in the url for query.
by using the context on the loading of this page the website fetches the seance and seance/taken routesin order to make a comparison.
by using array methods such as .find() and .some() and testing on position with the x and y axis that component has it checks in this way:

(this system operates on the ReservationHour component)

### checking for the seances the admin added

by fetching the "http://localhost:3310/api/seance/" route the page first compares the list of object on the date and hour index properties with corresponding ListeReservationDay (x axis) and ReservationHour (y axis) via the props and looks for correlations.
when a time slot exists with a corresponding x and y axis it uses a ternary operator to render the appointment button instead of the grey div to allow users to use the confirmPopUp component to select the dog they want to take the appointment.

### checking for availability between users

by fetching the "http://localhost:3310/api/seance/taken/" route the page then compares the available schedule to the newly fetched list of slots in order to check in corresponding day and hour index if there is also a userId that took this appointment.
This allows to keep the seance in the seance table for admin checking and constraint keys in the sql schema.

### checking for availability in the current week

by checking the date and hour elements of the object on the seance route the algorythm checks on render wheter to make the slot available or not by comparing the current time.

I.E : an appointment for monday 23 that was not taken by a user shouldn't be displayed on tuesday 24 because it is in the past.

the functions and variables for this system are imported from the globalUtils.js file in the src folder

when the selection is made the user has a choice for the dog he wants to take with him and the submit button adds his userId as well as his first name, last name and corresponding dogId to the form that submits on the update of this route "http://localhost:3310/api/seance/:id"

## admin calendar

the admin has a every slot turned to buttons instead of grey divs and a button for each service, which are fetched to allow new services to work on this system.
after the user clicks on a service button the selectedService changes to allow following additions to the form submission to have the corresponding serviceId.

When a service is selected and the admin clicks on an empty slot it turns it into a color to display the modification on the local page.
These colors are predefined to allow easier understanding of the interface and vary for each base service.
In order to allow new services to be recognisable they are also displayed in their own color (yellow).

After the admin selected the desired the schedule for each service he can use the submit button to push the form with added slots coordinates and service id to this post route "http://localhost:3310/api/seance/"

the calendar can then render with a pop on hover with the "http://localhost:3310/api/seance/taken/" route from the context to compare with the date and hour index coordinates in order to show wheter the slot is available or who took the appointment with their dog.


1. Front

/src
│
├── /components
│   ├── /Calendar
│   │   └── Calendar.jsx
│   │
│   ├── /ListeReservationDay
│   │   └── ListeReservationDay.jsx
│   │  
│   │
│   ├── /ReservationHour
│   │   ├── ReservationHour.jsx
│   │   └── ConfirmPopUp.jsx 
│   │
│   ├── /ConfirmPopUp
│   │   └── ConfirmPopUp.jsx
│   │   
│   └── /globalUtils.js
│
├── /context
│   └── reservationContext.jsx


2. Back


│
├── controllers
│   ├── seanceAction.js           
│
├── models
│   ├── SeanceRepository.js        
│
├── routers
│   ├── seanceRouter.js          
│





## Introduction

Le système de calendrier a été conçu en utilisant un système de tableau à deux dimensions (2D).

Pour répertorier les disponibilités, la base de données a été construite de cette manière :

La grille est créée avec chaque créneau horaire défini comme indisponible par défaut.
En utilisant les props de composants séparés pour les axes vertical et horizontal, nous pouvons localiser chaque position dans les créneaux.
Des tests sont effectués au chargement pour comparer les disponibilités en fonction de la création de créneaux par l'admin via le tableau de bord pour les services correspondants.
En sélectionnant et validant un créneau horaire, un utilisateur modifie cette entrée dans la base de données.
Voici les paramètres variables d'une entrée de séance dans la base de données :

- Grille 2D
La table des séances contient une valeur hourIndex (axe Y) et dayIndex (axe X) pour chaque ligne, permettant une comparaison avec les grilles construites à l'aide de la méthode .map() et des props React.

- ServiceId
Chaque ligne a également un serviceId permettant de comparer selon le service sélectionné par l'utilisateur. Celui-ci peut être accessible via la fonction req.params de react-router-dom.

- Date et heure
Bien que ces paramètres ne soient pas utilisés dans le système de grille, ils sont ajoutés via les props du composant d'où ils proviennent. Cela permet de vérifier dans la base de données si nécessaire pour une meilleure lisibilité et aussi pour s'assurer qu'ils ne sont pas affichés si personne ne les a pris et que l'heure est déjà passée.

- Disponibilité
Une séance n'a pas besoin d'avoir un userId, un prénom, un nom de famille ou un dogId pour être créée. Cependant, lorsqu'ils sont ajoutés, l'admin peut consulter ces créneaux programmés. Lorsque ces informations sont ajoutées via la mise à jour du système CRUD, les créneaux sont considérés comme indisponibles et ne seront plus affichés pour d'autres utilisateurs. Ils apparaîtront également dans l'onglet "séances" de l'utilisateur, soit dans "passé" soit dans "à venir", selon l'heure actuelle.

## Différentes versions du calendrier

Afin de permettre à l'admin de programmer les créneaux horaires chaque semaine, le composant du calendrier se décline en deux versions.

1. Calendrier pour les clients

Lorsque l'utilisateur consulte les services et souhaite vérifier les disponibilités, le calendrier compare les paramètres en fonction de la sélection dans les pages de services, liée à la table des services, pour que le calendrier fonctionne sur les nouveaux services admin sans intervention du webmaster. L'utilisateur est redirigé vers la page du calendrier avec l'id du service correspondant dans l'URL pour la requête. En utilisant le contexte au chargement de cette page, le site récupère les routes seance et seance/taken pour effectuer une comparaison. À l'aide de méthodes comme .find() et .some() et de tests sur la position avec les axes X et Y, le composant effectue une vérification de cette manière :

- Vérification des séances ajoutées par l'admin

En récupérant la route http://localhost:3310/api/seance/, la page compare la liste d'objets sur les propriétés date et hourIndex avec les composants ListeReservationDay (axe X) et ReservationHour (axe Y) via les props et recherche des correspondances. Lorsqu'un créneau horaire existe avec un axe X et Y correspondant, un opérateur ternaire est utilisé pour rendre le bouton de rendez-vous au lieu du div gris, permettant aux utilisateurs d'utiliser le composant confirmPopUp pour sélectionner le chien avec lequel ils souhaitent prendre rendez-vous.

- Vérification de la disponibilité entre utilisateurs

En récupérant la route http://localhost:3310/api/seance/taken/, la page compare l'emploi du temps disponible avec la nouvelle liste de créneaux récupérée afin de vérifier dans les index de jour et d'heure correspondants s'il y a également un userId qui a pris ce rendez-vous. Cela permet de conserver la séance dans la table des séances pour la vérification admin et les clés de contrainte dans le schéma SQL.

- Vérification de la disponibilité dans la semaine en cours

En vérifiant les éléments date et hour de l'objet sur la route seance, l'algorithme vérifie à l'affichage si le créneau doit être disponible ou non en comparant avec l'heure actuelle.

<!-- Exemple : un rendez-vous pour le lundi 23 qui n'a pas été pris par un utilisateur ne devrait pas être affiché le mardi 24, car il est déjà passé. -->

Les fonctions et variables pour ce système sont importées depuis le fichier globalUtils.js dans le dossier src.

Lorsque la sélection est faite, l'utilisateur peut choisir le chien qu'il souhaite emmener, et le bouton de soumission ajoute son userId ainsi que son prénom, son nom et le dogId correspondant au formulaire qui soumet la mise à jour sur cette route : http://localhost:3310/api/seance/:id.

2. Calendrier admin

L'admin voit chaque créneau transformé en bouton plutôt qu'en div gris, avec un bouton pour chaque service. Ces boutons sont récupérés pour permettre aux nouveaux services de fonctionner sur ce système. Après que l'admin a cliqué sur un bouton de service, le selectedService change pour permettre aux ajouts suivants au formulaire de soumission d'avoir l'id de service correspondant.

Lorsqu'un service est sélectionné et que l'admin clique sur un créneau vide, celui-ci change de couleur pour afficher la modification sur la page locale. Ces couleurs sont prédéfinies pour faciliter la compréhension de l'interface et varient selon chaque service de base. Afin de permettre aux nouveaux services d'être reconnaissables, ils sont également affichés dans leur propre couleur (jaune).

Après que l'admin a sélectionné l'emploi du temps souhaité pour chaque service, il peut utiliser le bouton de soumission pour envoyer le formulaire avec les coordonnées des créneaux ajoutés et l'id du service sur cette route post : http://localhost:3310/api/seance/.

Le calendrier peut alors s'afficher avec une fenêtre pop-up au survol en utilisant la route http://localhost:3310/api/seance/taken/ depuis le contexte pour comparer avec les coordonnées d'index de jour et d'heure afin d'afficher si le créneau est disponible ou qui a pris rendez-vous avec leur chien.

## Chemin Front et Back du Calendrier 


1. Front

/src
│
├── /components
│   ├── /Calendar
│   │   └── Calendar.jsx
│   │
│   ├── /ListeReservationDay
│   │   └── ListeReservationDay.jsx
│   │  
│   │
│   ├── /ReservationHour
│   │   ├── ReservationHour.jsx
│   │   └── ConfirmPopUp.jsx 
│   │
│   ├── /ConfirmPopUp
│   │   └── ConfirmPopUp.jsx
│   │   
│   └── /globalUtils.js
│
├── /context
│   └── reservationContext.jsx


2. Back


│
├── controllers
│   ├── seanceAction.js           
│
├── models
│   ├── SeanceRepository.js        
│
├── routers
│   ├── seanceRouter.js          
│
