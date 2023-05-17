import { TRoom } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"

const mongoHandler = new MongoDbHandler()
export const getRoom = async (salaPrincipal: string): Promise<TRoom> => {
    const mainRoom = await mongoHandler.getRoom(salaPrincipal)
    return mainRoom
}