import { Link } from "react-router-dom"
import { socket } from "../../context/redux/reducer"
import { useSelector } from "react-redux"
import './roomList.css'
import CreateRoomBtn from "../createRoomBtn/CreateRoomBtn"
import { useState } from "react"
import logo from '../../img/room_logo.png'
import binLogo from '../../img/bin_logo.png'
import home from '../../img/home.png'
import WarningModal from "../warningModal/WarningModal"

export default function RoomList({ pathname }) {
    if (pathname !== '/') pathname = pathname.slice(1)
    const state = useSelector(state => state)
    const [creatingRoom, setCreatingRoom] = useState(false)
    const [warning, setWarning] = useState(false)
    const [warningMsg, setWarningMsg] = useState("")

    const deleteRoom = (room) => {
        const roomToDelete = state.rooms.find(room_two => room_two.name === room.name)
        console.log(roomToDelete)
        if (roomToDelete.users.length !== 0) {
            setWarningMsg('❌ hay usuarios en la sala')
            setWarning(true)
            setTimeout(() => {
                setWarningMsg('')
                setWarning(false)
            }, 1500)
        } else if (roomToDelete.users.length === 0) {
            socket.emit('delete-room', room)
        }
    }

    const joinRoom = (room) => {
        socket.emit('join-room', room, pathname, state.userName)
        socket.emit('user-joined-room-message', `/${room.name}`, state.userName)
    }
    return <ul className='roomUl'>
        <li
            className="roomLi">
            {
                creatingRoom ? <CreateRoomBtn setWarning={setWarning} setWarningMsg={setWarningMsg} creatingRoom={creatingRoom} setCreatingRoom={setCreatingRoom}
                    onMouseLeave={() => setCreatingRoom(false)} />
                    :
                    <button
                        onMouseOver={() => setCreatingRoom(true)}
                        className='createRoomBtn'
                    >Crear Sala ➕</button>
            }
        </li>
        {
            warning && <WarningModal warningMsg={warningMsg} />
        }
        {state.rooms.length > 0 && state.rooms.map((room, index) => {
            if (index !== 0) {
                return (
                    <li className="roomLi" key={index} >
                        <Link className="roomLink" to={`/${room.name}`} onClick={() => joinRoom(room)} >
                            <div className="imgPContainer">
                                <img className="roomLogo" src={logo} alt="" />
                                <p>{room.name}</p>
                            </div>
                        </Link>
                        {
                            room.owner === state.userName ? <button className="deleteBtn" to={'/'} onClick={() => deleteRoom(room)} ><img className="binLogo" src={binLogo} alt="" /></button > : ""
                        }
                    </li>
                )
            }

            return <li key={index} className="roomLi">
                <Link onClick={() => joinRoom({ name: 'sala principal' })}
                    className='homeBtn' to='/'>
                    <img className='homeImg' src={home} alt="" />
                    Sala principal
                </Link>
            </li>

        })}
    </ul>
}