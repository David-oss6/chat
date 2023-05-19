
import { getDb } from "../../database/mongoConnection";
import { TMessage, TRoom, } from "../domain/types";

export class MongoDbHandler {

    async updateMessages(msg: TMessage) {
        let result: object[] = []
        const db = await getDb()
        await db.collection('rooms').updateOne({ name: msg.room }, {
            $push: {
                messages: {
                    text: msg.text,
                    owner: msg.owner,
                    room: msg.room,
                    time: new Date().toISOString(),
                }
            }
        })
        const rooms = await db.collection('rooms').find()
        await rooms.forEach((room) => {
            result.push(room)
        })
        return result
    }

    async findRoom(room: TRoom) {
        const db = await getDb()
        const exists = await db.collection('rooms').findOne({ name: room.name })
        return exists
    }
    async getRoom(salaPrincipal: string): Promise<TRoom> {
        const db = await getDb()
        const room: any = await db.collection('rooms').findOne({ name: salaPrincipal })
        return room
    }
    async getRooms(userName: string | null) {
        const db = await getDb()
        let rooms
        if (userName) rooms = await db.collection('rooms').find({ name: userName })
        if (!userName) rooms = await db.collection('rooms').find()
        const listOfRooms: object[] = []
        await rooms?.forEach((room) => {
            listOfRooms.push(room)
        })
        return listOfRooms
    }

    async createRoom(room: TRoom) {
        const db = await getDb()
        await db.collection('rooms').insertOne({
            name: room.name,
            owner: room.owner,
            pass: room.pass,
            users: [],
            messages: []
        })
    }

    async joinRoom(roomToJoin: TRoom, user: string) {
        const db = await getDb()
        await db.collection('rooms').updateOne({ name: roomToJoin.name }, { $push: { users: { name: user } } })
    }

    async leaveRoom(roomToLeave: string, user: string) {
        const db = await getDb()
        await db.collection('rooms').updateOne({ name: roomToLeave }, { $pull: { users: { name: user } } })
        const d = await db.collection('rooms').findOne({ name: roomToLeave })
    }

    async deleteRoom(room: TRoom) {
        const db = await getDb()
        await db.collection('rooms').deleteOne({ name: room.name })
    }

    async deleteRoomsOnDisconnect(userName: string) {
        const db = await getDb()
        await db.collection('rooms').deleteMany({
            owner: userName,
            $and: [
                { users: { $ne: userName } },
                { users: { $size: 0 } }
            ]
        })
        const roomsAfterDelete = await db.collection('rooms').find()
        const listOfRooms: object[] = []
        await roomsAfterDelete?.forEach((room) => {
            listOfRooms.push(room)
        })
        return listOfRooms
    }
}