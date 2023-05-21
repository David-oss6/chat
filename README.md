                            📟 Chat 📟


Chat developed with Javascript at the frontend and Typescript at the backend. 
Using mainly [socket.io](https://socket.io/) and NodeJs at the backend. And MongoDB as a NoSQL database.
Using React at the frontend separating the client and back-end into two different servers.

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

- At backend:

In the folder you just downloaded, go to backend directory. You will find a file called "_.env-template_". Make a copy of it, name it "_.env_" and complete the fields inside that belong to your system. Above all, configure the credentials of your Json web token (_JWT_KEY_)  and port (_PORT_).

### Install dependencies

To install the dependencies you need to install both the client and backend dependencies. From a terminal we place it in the folder_client_i_server_and execute, respectively, the order

    npm install

Once installed, also separately, we will raise the two servers by executing the command respectively.

    npm start

Through the client console we will see in which direction the server is and we will be able to connect to it from a browser.

## Characteristics

This is a chat aplicattion where you can chat with other users. There is main room and you have the option to create and delete other rooms.
It is announced averytime a new user joins the room you are at.

## BACKEND

For more information about the backend server see:[SERVER README](./backend/README.md)

## FRONTEND

For more information about the front-end server:[CLIENT README](./client/README.md)
