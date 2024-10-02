
import Authentication from './Componetns/Authentication';
import Login from './Componetns/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './Componetns/Register';
import './Styles/Layout.css'
import Otp from './Componetns/Otp';
import ForgetPass from './Componetns/ForgetPass';
import './App.css'
import Navbar from './Componetns/Navbar';
import MainLayout from './MainLayout';
import Home from './Componetns/Home';
import Sidebar from './Componetns/Sidebar';
import Userdata from './Componetns/Userdata';


function App() {
  return (
    <div >

      <Router>
       
              <Routes>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/authentication' element={<Authentication/>}></Route>
            <Route path='/otpSend' element={<Otp/>}></Route>
            <Route path='/newPassword' element={<ForgetPass/>}></Route>
            <Route path='/mainlayout' element={<MainLayout/>}> </Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/userdata' element={<Userdata/>}></Route>
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
