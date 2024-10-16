# EducaTruffe

A website designed for a canine trainer, offering an appointment booking system for various services via a dynamic calendar. Users can manage their personal space, register their dogs, and review the history of past and upcoming sessions. The site also allows sending and receiving emails through a newsletter, while the site owner can add new services, receive client feedback, comment, and track the session history.


## Tech Stack

This project uses Harmonia. Harmonia is a framework meant to serve as a foundation for every project following the React-Express-MySQL stack, as learned in Wild Code School. It's pre-configured with a set of tools which'll help students produce industry-quality and easier-to-maintain code, while staying a pedagogical tool.

**Client:** 

- React : JavaScript library for building user interfaces.
- Axios : Used to make HTTP requests (communication with the backend).
- Date-fns : Library for date manipulation, useful for the session calendar.
- ESLint with AirBnB and Prettier: Linting and formatting tools to ensure code quality.

**Server:** 

- Express.js : Node.js framework for creating the server and managing routes.
- JWT (JSON Web Token) : Used for user authentication and session management.
- Argon2: Library for secure password hashing.
- Nodemailer: Used for sending emails, particularly for newsletters.
- Multer: Middleware to handle image uploads (such as service photos).
- MySQL: Relational database to store information about users, dogs, sessions, and services.
- Postman: Used for unit and API testing.
- Nodemon: Tool to automatically restart the server during development.


## Installation

1- Clone the project:
Clone the repository using the following command:

```
git clone https://github.com/username/educatruffe.git
```

2- Install Backend Dependencies:
Navigate to the server folder and install the dependencies using npm:

```
cd educatruffe/server
npm install```

3- Install Frontend Dependencies:
Open another terminal, navigate to the client folder, and install the dependencies:

```cd ../client
npm install
```

4- Configure Environment Variables:
Create .env files for both backend and frontend using the provided samples.

- Backend (.env):
In the server/ folder, create a .env file based on .env.sample:

```
APP_PORT=3310
APP_SECRET=YOUR_APP_SECRET_KEY

Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=educatruffe

Email sending configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password

Client URL for CORS configuration
CLIENT_URL=http://localhost:3000
```

- Frontend (.env):
In the client/ folder, create a .env file:

```
VITE_API_URL=http://localhost:3310
```

5- Start the Server:
Once the environment variables are configured, launch the backend and frontend servers.

For the backend (Express):

```
cd server
npm run db:migrate
npm run dev
```

For the frontend (Vite):

```
cd client
npm run dev
```

6- Access the Application:
Backend: The API is accessible at http://localhost:3310.
Frontend: The React app is available at http://localhost:3000.

## Authors

- [@ThomasDziurdzi](https://github.com/ThomasDziurdzi)
- [@idgaram](https://github.com/idgaram)
- [@JordanThivault](https://github.com/JordanThivault)
- [@PerrineD78](https://github.com/PerrineD78)
- [@djo65](https://github.com/djo65)
- [@Seb-Gandoin](https://github.com/Seb-Gandoin)
- [@Dolpheus89](https://github.com/Dolpheus89)