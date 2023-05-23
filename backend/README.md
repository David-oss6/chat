# BACKEND

Backend sever developed with Typescript and based in Express and Socket.io

## Dependències

The server is using these dependecies:

- `express` 
- `dotenv` 
- `cors` 
- `bcryptjs` 
- `jsonwebtoke` 
- `mongoDB` 
- `socket.io` 

## Architecture

* __Api__ To handle the petitions to the server
    * __Controllers__ To handle the endpoints.
    * __Router__ API routes
* __Database__ Initializing and connecting with the database.
* __Dist__ Javascript transpiled
* __Middlewares__  Middlewares for authentication, validation and cypher the passwords. 
* __Room__
    * __Application/use-cases__ To separate use cases of the application
    * __Domain__ 
        * __Entities__ Room interface
        * __Repository__ Repository interface
    * __Infrastructure__ To communicate the app logic with the database.
        * __Repository__ To access the database   
* __Server__ To both build and start NodeJs and Socket.io. servers
* __User__ 
    * __Application/use-cases__ To separate use cases of the application
    * __Domain__ 
        * __Entities__ Room interface
        * __Repository__ Repository interface
    * __Infrastructure__ To communicate the app logic with the database.
        * __Repository__ To access the database 

## API

Through the api I handle the server petitions of authentication and validation of the user

## SOCKET

The application is based on socket io to back and forward the petitions of the frontend. 
These petitions are divided in each entity, room and user, to handle their own logic, funcionality
and access to database independently.

## DATABASE

The application is configured to use mongoDB, accessing the default url (__'mongodb://127.0.0.1:27017/'__) plus the database name '__chat__'. If the database doesn`t exist the app will create it with the collections __rooms__ and __users__, creating as well the main room and the admin user.

