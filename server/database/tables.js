// Import the repository modules responsible for handling data operations on the tables
const AdminRepository = require("./models/AdminRepository");
const ItemRepository = require("./models/ItemRepository");
const NewsletterRepository = require("./models/NewsletterRepository");
const UserRepository = require("./models/UserRepository");
const DogRepository = require("./models/DogRepository");
const AppointmentRequestRepository = require("./models/AppointmentRequestRepository");
const ServiceRepository = require("./models/ServiceRepository");
const NewsletterUserRepository = require("./models/NewsletterUserRepository");
const SeanceRepository = require("./models/SeanceRepository");
const CommentaireRepository = require("./models/CommentaireRepository");
const CalendarRepository = require("./models/CalendarRepository");
const SeanceReportRepository = require("./models/SeanceReportRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.item = new ItemRepository();
tables.newsletter = new NewsletterRepository();
tables.admin = new AdminRepository();
tables.user = new UserRepository();
tables.dog = new DogRepository();
tables.appointmentRequest = new AppointmentRequestRepository();
tables.service = new ServiceRepository();
tables.newsletterUser = new NewsletterUserRepository();
tables.seance = new SeanceRepository();
tables.commentaire = new CommentaireRepository();
tables.calendar = new CalendarRepository();
tables.seanceReport = new SeanceReportRepository();
/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
