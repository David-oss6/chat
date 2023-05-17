import { TMessage } from "../domain/types"
import { MongoDbHandler } from "../repository/MongoDbHandler"
const mongoHandler = new MongoDbHandler()

export const updateMessages = async (msg: TMessage) => {
    const messages = await mongoHandler.updateMessages(msg)
    return messages
}