import { MongoClient, Db } from 'mongodb'
import { Room, User } from './collectionsInterface'

const dbName = 'chat3'
const url = `mongodb://127.0.0.1:27017/${dbName}`

let dbConnection: Db

export const connectToDb = async (cb: Function) => {
  try {
    const client = await MongoClient.connect(url)
    dbConnection = client.db()

    // Check if the database "chat" exists
    const dbNames = await client.db().admin().listDatabases()
    const databaseExists = dbNames.databases.some((db: any) => db.name === dbName)
    if (!databaseExists) {
      // Create the database "chat" if it doesn't exist
      await dbConnection.createCollection('rooms')
      await dbConnection.createCollection('users')
      const roomsCollection = dbConnection.collection<Room>('rooms')
      const usersCollection = dbConnection.collection<User>('users')
      //  Insert the user object into the "users" collection

      try {
        await roomsCollection.insertOne({
          name: "/",
          owner: "admin",
          pass: "",
          users: [],
          messages: []
        })
      } catch (error) {
        console.log(error)
      }
      try {
        await usersCollection.insertOne({
          name: 'admin',
          pass: process.env.ADMIN_PASS!,
          socketId: ''
        })
      } catch (error) {
        console.log(error)
      }


    }

    return cb()
  } catch (err) {
    console.log(err)
    return cb(err)
  }
}

export const getDb = () => dbConnection