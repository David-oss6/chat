import { getDb } from "../database/mongoConnection";
import { TMessage, TRoom, TUser } from "../domain/types";

export class MongoDbHandler{
    async resetTable() {
    const db = await getDb()
    await db.collection('messages').deleteMany({})
  }
    
    async findUser(user: TUser){
        const db = await getDb()        
            const userExists = await db.collection('users').findOne({name: user.name})
             return userExists      
    }

    async getUsers(){       
    let result: object[] = [] 
    const db = await getDb()
    const users = await db.collection('users').find() 
    if(users){
        await users.forEach(user => {
          result.push(user)
        })
    } else {
        result = users
    }
    return result
    }

    async createUser(newUser: TUser){
    const db = await getDb()
    await db.collection('users').insertOne({name: newUser.name, pass: newUser.pass })    
    }

    async getMessages(){
      let result: object[] = []
      const db = await getDb()
      const messages = await db.collection('messages').find()
      if(messages){
          await messages.forEach(msg => {       
          result.push(msg)
          })    
      }
      return result
    }

    async updateMessages(msg:TMessage){
      let result: object[] = []
      const db = await getDb()
      await db.collection('rooms').updateOne({name: msg.room},{ $push: { messages: {
      text: msg.text,
      owner: msg.owner,
      room: msg.room,
      time: new Date().toISOString(),
      }      
    }})
    const rooms = await db.collection('rooms').find()
    await rooms.forEach(room => {       
      result.push(room)
    })       
    
    return result
    }   
  

async findRoom(room:TRoom){
    const db = await getDb()
    const exists = await db.collection('rooms').findOne({name : room.name})    
    return exists
}
async getRoom(salaPrincipal: string):Promise<TRoom>{
    const db = await getDb()
    const room: any = await db.collection('rooms').findOne({name: salaPrincipal})
    return room
}
async getRooms(){
    const db = await getDb()
    const rooms = await db.collection('rooms').find()
    const listOfRooms: object[] = []
    await rooms.forEach((room)=>{
        listOfRooms.push(room)
    })
    return listOfRooms
}

async createRoom(room: TRoom){   
    const db = await getDb()
    await db.collection('rooms').insertOne({
        name: room.name,
        owner: room.owner,
        pass: room.pass,
        users: [],
        messages: []
    })    
}

async joinRoom(roomToJoin: TRoom, user:string){
    const db = await getDb()
    await db.collection('rooms').updateOne({name:roomToJoin.name},{ $push: { users: {name: user }}})
}

async leaveRoom(roomToLeave:string, user: string){
    const db = await getDb()       
    await db.collection('rooms').updateOne({name:roomToLeave},{ $pull: { users: {name: user}}})
    const d = await db.collection('rooms').findOne({name:roomToLeave})
}

async deleteRoom(room:TRoom){
    const db = await getDb()
    await db.collection('rooms').deleteOne({name: room.name})
}  

async deleteRoomsOnDisconnect(id:string){
    const db = await getDb()
    await db.collection('rooms').deleteMany({owner: id})    
}   
}