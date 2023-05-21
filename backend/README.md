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
- `socket.io` Per establir i mantenir les connexions a temps real amb el servidor client que permeten el xat.

## Architecture

I`m using hexagonal architecture and its organized with the following structure:

* __Controllers__ To handle the endpoints.
* __Database__ Initializing and connecting with the database.
* __Middlewares__  Middlewares for authentication, validation and cypher the passwords. 
* __Room__
    -   Domain: To handle the socket and provide types.
    -   Repository: To acces the database.
    -   Service: 
* __Router__ API routes
* __Server__ To both servers NodeJs and Socket.io.
* __User__ 
    -   Domain: To handle the socket and provide types.
    -   Repository: To acces the database.
    -   Service: 

## API

Through the api I handle the server petitions of authentication and validation the user

## SOCKET

The application is based on socket io to back and forward the petitions of the frontend. 
These petitions are divided in each entity, room and user, to handle their own logic, funcionality
and access to database independently.
