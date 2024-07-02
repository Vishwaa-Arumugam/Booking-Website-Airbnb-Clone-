import './App.css'
import { Route, Routes } from "react-router-dom";
import Indexpage from './Pages/Indexpage';
import Loginpage from './Pages/Loginpage';
import Layout from './Layout';
import Registerpage from './Pages/Registerpage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './Pages/AccountPage';
import PlacesPage from './Pages/PlacesPage';
import PlacesFormPage from './Pages/PlacesFormPage';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Indexpage/>}/>
            <Route path='/login' element={<Loginpage/>}/>
            <Route path='/register' element={<Registerpage/>}/>
            <Route path='/account' element={<AccountPage/>}/>
            {/* <Route path='/account/:subpage?' element={<AccountPage/>}/> */}
            <Route path='/account/places' element={<PlacesPage/>}/>
            <Route path='/account/places/new' element={<PlacesFormPage/>}/>
            <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
