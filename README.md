## Backend RESTful API with MongoDB and Express

Welcome to this simple backend RESTful API that showcases the relationship between MongoDB and Express, as well as the connection between controllers, models, and routes. This project is fully Dockerized, utilizing two containers simultaneously.

### Getting Started

**Without Docker:**

1.  Ensure that you have MongoDB installed and running. Configure the `.env` file based on your MongoDB server.
2.  Install the required node packages by running `yarn` in the project directory.
3.  Start the project with `yarn start`.

**With Docker:**

1.  Make sure Docker is installed and running on your system.
2.  Run `docker compose up` in the project's root directory.

### Testing the API

To test the API, you can use the following endpoint: `http://localhost:3000/users/`. Submit HTTP GET, POST, PUT, or DELETE requests with or without the `:id` as a parameter. Refer to the user model and route to understand how the request-response cycle works.
