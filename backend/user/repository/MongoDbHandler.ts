import { getDb } from "../../database/mongoConnection"
import { TUser } from "../domain/types"


export class MongoDbHandler {
    async findUser(user: TUser) {
        const db = await getDb()
        const userExists = await db.collection('users').findOne({ name: user.name })
        return userExists
    }

    async getUsers() {
        let result: object[] = []
        const db = await getDb()
        const users = await db.collection('users').find()
        if (users) {
            await users.forEach(user => {
                result.push(user)
            })
        } else {
            result = users
        }
        return result
    }

    async getUser(socketId: string) {
        const db = await getDb()
        let userName = await db.collection('users').findOne({ socketId: socketId })
        if (userName) userName = userName.name
        return userName
    }

    async createUser(newUser: TUser) {
        const db = await getDb()
        await db.collection('users').insertOne({ name: newUser.name, pass: newUser.pass, socketId: "" })
    }

    async updateUser(user: TUser, socketId: string) {
        const db = await getDb()
        await db.collection('users').updateOne({ name: user.name }, { $set: { socketId: socketId } })
    }

}