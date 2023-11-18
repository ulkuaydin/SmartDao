// import {useDispatch, useSelector} from 'react-redux';
import './App.css'
import Header from './pages/shared/Header';
import { Outlet } from 'react-router-dom';

function App() {
  
  // const value = useSelector((state)=> state.user.amountAddress);
  // const dispatch = useDispatch();

  return (
    <>
    <Header/>
     <div className='main'>
      <Outlet/>
     </div>
    </>
  )
}

export default App
