import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()

export const deleteRoomsOnDisconnect = async (userName: any) => {
    const roomToLeave = await mongoHandler.getRooms(null)
    roomToLeave.forEach(async (room: any) => {
        await mongoHandler.leaveRoom(room.name, userName)
    })
    const roomsAfterDelete = await mongoHandler.deleteRoomsOnDisconnect(userName)
    return roomsAfterDelete
}