📟 Chat 📟


Chat developed with Javascript at the frontend and Typescript at the backend. 
Using mainly [socket.io](https://socket.io/) and NodeJs at the backend. 
And MongoDB as a NoSQL database.
Using React at the frontend separating the client and backend into two different servers.

## Technology used

-   NodeJS
-   Socket.io
-   Express 
-   MongoDB
-   React

## Requirements

To be able to use the chat you must have installed on your computer:

-   NodeJS (<https://nodejs.org/ca/>)
-   MongoDB (<https://www.mongodb.com//>)

## Download the repository

Download this repository to your local computer. If you have GIT installed you can do it from a terminal with the command

    git clone https://github.com/David-oss6/chat.git


## Standard installation

### Set the environment variables

In the folder you just downloaded, go to backend directory. You will find a file called "_.env-template_". Make a copy of it, name it "_.env_" and complete the fields inside that belong to your system. Above all, configure the credentials of your Json web token (_JWT_KEY_)  and port (_PORT_).

### If running in production:

    *   In backend/router foler: remove '/api' from routes
    *   In client/package.json remove the first line 'proxy'
    *   In client/src/components/loginSignin/LoginSignin.js remove '/api' at line 25
    *   In client/src/components/roomList/Roomlist.js remove '/api' at line 40

### Install dependencies

To install the dependencies you need to install both the client and backend dependencies. From a terminal we place it in the folder_client_i_server_and execute, respectively, the order

    npm install

Once installed, also separately, we will raise the two servers by executing the command at CHAT_REACT+TS/client directory: 

    npm start

And executing at CHAT_REACT+TS/backend directory the commands:
First to compile typescript:

    npm tsc

Second to execute the server:

    npm start

## Characteristics

This is a chat aplicattion where you can chat with other users. There is main room and you have the option to create and delete other rooms.
It is announced averytime a new user joins the room you are at.

## BACKEND

For more information about the backend server see:[SERVER README](./backend/README.md)

## FRONTEND

For more information about the front-end server:[CLIENT README](./client/README.md)
