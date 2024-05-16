# NestJS Motor Insurance API

This project is a NestJS-based API for managing motor insurance. It uses PostgreSQL for data storage and provides a comprehensive set of endpoints documented with Swagger.

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Database](#database)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Authorization](#authorization)
- [Support](#support)

## Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:plateena/z-nest.git
    cd z-nest
    ```

2. Copy the `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```

3. Update the `.env` file with your configuration:
    - Ensure `JWT_SECRET` is set.
    - Set `ADMIN_PASSWORD` for the Swagger authorization login endpoint.

## Environment Variables

Ensure the following environment variables are set in your `.env` file:

- `JWT_SECRET`: Secret key used for JWT authentication.
- `ADMIN_PASSWORD`: Password used for the authorization login endpoint in Swagger.

## Docker

This project uses Docker to manage its services. It includes containers for the NestJS application and PostgreSQL databases.

### Starting the Containers

1. Build and start the Docker containers:
    ```bash
    docker-compose up --build
    ```

2. The application will be available at `http://localhost:3000`.

### Stopping the Containers

To stop the containers, run:
```bash
docker-compose down
```

## Database

The setup includes two PostgreSQL databases:
- Main database
- Test database

These are configured in the `docker-compose.yml` file.

## Running the Application

To run the application locally (without Docker), use the following commands:

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run the application:
    ```bash
    npm run start
    ```

3. The application will be available at `http://localhost:3000`.

## Running Tests

To run the tests with coverage inside Docker, use the following command:
```bash
docker-compose run app npm run test:details
```

This command will run the Jest test suite within the Docker container and provide detailed coverage information.

## API Documentation

API documentation is available via Swagger. After starting the application, you can access it at:

```
http://localhost:3000/api-docs
```

## Authorization

To access protected endpoints, you need to authorize using a JWT token. Follow these steps:

1. Use the authentication endpoint to obtain an access token:
    - Send a POST request with the body: `{ "password": "your_admin_password" }` to the `/auth/login` endpoint.
    - You will receive a response containing the access token.

2. Open the Swagger documentation at `http://localhost:3000/api-docs`.

3. Click on the `[Authorize]` button.

4. Enter the token in the input field in the following format: `Bearer <JWT>`.

5. Click `[Authorize]` to authenticate your requests.

## Support

For support, please contact [API Support](mailto:zainundin.coders@gmail.com).
