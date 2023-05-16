
import { MongoClient, Db } from 'mongodb'
const url = `mongodb://127.0.0.1:27017/chat`

let dbConnection: Db

export const connectToDb = async (cb:Function) => {
  try {
    const client = await MongoClient.connect(url)
    dbConnection = client.db()
    return cb()
  } catch (err) {
    console.log(err)
    return cb(err)
  }
}
export const getDb = () => dbConnection

