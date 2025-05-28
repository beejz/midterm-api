Midterm API

A simple Products CRUD API built with Express.js and supportive middleware, created as part of a midterm demonstration.

Description

This API allows users to manage a collection of products through standard Create, Read, Update, and Delete operations. It showcases how community packages can simplify common server tasks and improve maintainability.

Features

Retrieve a list of all products

Retrieve a single product by its unique identifier

Create a new product with validation and default mappings

Update an existing product with validation

Delete a product by its identifier

Generate a random product-like name via a bonus endpoint

Check whether a given word is a palindrome via a bonus endpoint

Technology Stack

This project uses the following core components and middleware:

Node.js runtime environment

Express.js framework for routing and middleware management

express-validator for input validation of request payloads

uuid for generating universally unique identifiers for products

morgan for concise HTTP request logging in development

helmet for securing HTTP headers by default

cors for enabling configurable cross-origin resource sharing

dotenv for environment variable configuration

Setup and Installation

First, ensure that Node.js and npm are installed on your system. Then, install the project dependencies and start the development server by installing all required packages and running the server in development mode.

Environment Configuration

The server listens on a port defined by an environment variable. By default, it uses port 5001 if no custom port is provided.

API Endpoints

GET /products – Returns an array of all products

GET /products/:id – Returns a single product object matching the provided identifier, or a not-found response

POST /products – Creates a new product; expects validated fields or applies default mappings when fields are omitted

PUT /products/:id – Updates an existing product; expects validated fields or applies default mappings when fields are omitted

DELETE /products/:id – Deletes a product by its identifier and returns a no-content response


Usage and Demonstration

During the midterm demonstration, you can use an HTTP client to perform each of the five CRUD operations as well as the bonus endpoints, observing how middleware simplifies parsing, validation, logging, and security.

License

This project is intended for academic use and demonstration purposes only.

