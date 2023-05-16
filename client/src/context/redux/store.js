import { createStore } from "redux"
import { stateReducer } from "./reducer"
import { socket } from "./reducer"
import { updateMessages, updateNewUser, updateRooms } from "./actions"

export const store = createStore(
    stateReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //necesario para ReduxDevTools
)

socket.on('update-messages', (messages) => {
    store.dispatch(updateMessages(messages))
})

socket.on('update-rooms', async (rooms) => {
    await store.dispatch(updateRooms(rooms))
})

socket.on('update-new-user', (data) => {
    store.dispatch(updateNewUser(data))
})



