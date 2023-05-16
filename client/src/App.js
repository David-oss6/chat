import './App.css';
import MyRoutes from './components/myRoutes/MyRoutes';
import LoginSignin from './components/loginSignin/LoginSignin';
import { useSelector } from 'react-redux'

function App() {
  const logedIn = useSelector(state => state.logedIn)
  return (
    <>
      {
        logedIn ?
          <MyRoutes />
          :
          <LoginSignin />
      }
    </>
  );
}

export default App;
