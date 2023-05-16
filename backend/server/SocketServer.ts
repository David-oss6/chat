import { Server } from "socket.io"
import {createRoom,  deleteRoom, deleteRoomsOnDisconnect, getRoom, joinRoom, leaveRoom, login, signIn, updateMessages, updateNewUser} from '../service/socketHandler'
import { TMessage, TRoom, TUser } from '../domain/types'
import { comparePassword, hashPassword } from "../middlware/bcript"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { stringify } from "query-string/base"
dotenv.config()
const secretKey: string = process.env.JWT_KEY!

export class SocketServer {
    private readonly httpServer: any   ///   <----- any
    private readonly io
    constructor(httpServer: any, cors:any){  ///   <----- any
        this.httpServer = httpServer
        this.io = new Server (httpServer,{ 
            cors: {
                origin: '*' 
            }
        })       
    }

    async connect(): Promise<void>{         
    this.io.on('connection', async (socket)=>{    
    const data = await updateNewUser()
    socket.emit('update-new-user', data)

    socket.on('signin', async (newUser: TUser) =>{   
         newUser = {
            name: newUser.name,
            pass: await hashPassword(newUser.pass)
        }
        const exists: object | null = await signIn(newUser)
        socket.emit('sign-atempt', exists)        
    })

    socket.on('login', async (user:TUser)=>{    
        const isSigned = await login(user)
        if(isSigned){

            // jsonwebtoken INICIO            
            const name: string = isSigned.name
            const token = jwt.sign({name}, secretKey, {
                expiresIn: '1d'
            })




            // jsonwebtoken FIN 
           const isMatch = await comparePassword(user.pass, isSigned.pass)
            if(isMatch) {
            const roomToJoin = await getRoom('/')
            await joinRoom(roomToJoin, user.name)        
        }          
       }     
        socket.emit('login-atempt', isSigned)         
    })

    socket.on('user-joined-room-message', (location, name)=>{                
        const message = `${name} has joined the room`
         socket.broadcast.emit('user-joined-room-message', location , message)
    })


    socket.on('send-msg', async (msg:TMessage)=>{
       const rooms = await updateMessages(msg)
        socket.broadcast.emit('update-rooms', rooms)
        socket.emit('update-rooms', rooms)
    })   

    socket.on('create-room', async (newRoom: TRoom)=>{       
       const rooms = await createRoom(newRoom)    
       if (rooms){
           socket.broadcast.emit('update-rooms', rooms)
           socket.emit('update-rooms', rooms)
       } else {
        socket.emit(`${newRoom.name}-exists`, true)
       }       
    })

    socket.on('delete-room',async (room: TRoom)=>{
      const rooms = await  deleteRoom(room)           
      socket.broadcast.emit('update-rooms', rooms)
      socket.emit('update-rooms', rooms)
    })

    socket.on('join-room', async (roomToJoin:TRoom , roomToLeave:string | null, user:string)=>{          
       if (roomToLeave) await leaveRoom(roomToLeave, user)
       if(roomToJoin.name === 'sala principal'){roomToJoin = await getRoom('/')}    
        const rooms = await joinRoom(roomToJoin, user)        
        socket.broadcast.emit('update-rooms', rooms) 
        socket.emit('update-rooms', rooms)
    })

    socket.on('disconnect', async ()=>{        
        const rooms  = await deleteRoomsOnDisconnect(socket)      
        socket.emit('update-rooms', rooms)
        socket.broadcast.emit('update-rooms', rooms)
    })
    })
    }
}