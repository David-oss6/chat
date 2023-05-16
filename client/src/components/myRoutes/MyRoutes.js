import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Main from '../main/Main'

export default function MyRoutes() {
    const state = useSelector(state => state)

    return (
        <Routes>
            <Route path={`/`} element={<Main pathname={`/`} />} />
            {
                state.rooms.length > 0 && state.rooms.map((room, index) => {
                    return <Route key={index} exact path={`/${room.name}`} element={<Main pathname={`/${room.name}`} />} />
                })
            }
        </Routes>
    )
}
