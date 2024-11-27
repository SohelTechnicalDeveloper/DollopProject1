
import Authentication from './Componetns/Authentication';
import Login from './Componetns/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './Componetns/Register';
import './Styles/Layout.css'
import Otp from './Componetns/Otp';
import ForgetPass from './Componetns/ForgetPass';
import './App.css'
// import Navbar from './Componetns/Navbar';
import MainLayout from './MainLayout';
import Home from './Componetns/Home';
// import Sidebar from './Componetns/Sidebar';
import Userdata from './Componetns/Userdata';
import AgencyRoom from './Componetns/AgencyRoom';
import EmailFunctionality from './Componetns/EmailFunctionality';
import Campigns from './Componetns/Campigns';
import Dashboard from './Componetns/Dashboard';
import Tasks from './Componetns/Tasks';
import Test from './Componetns/Test';
import Blog from './Componetns/Blog';
import PurchagePakages from './Componetns/PurchagePakages';
import BlogDetails from './Componetns/BlogDetails';
import BlogById from './Componetns/BlogById';
import PurchagePackageDetails from './Componetns/PurchagePackageDetails';
import BharatSAT from './Componetns/BharatSAT';
import CreateExam from './Componetns/CreateExam';


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
            <Route path='/agencyRoom' element={<AgencyRoom/>}></Route>
            <Route path='/email' element={<EmailFunctionality/>}></Route>
            <Route path='/campaigns' element={<Campigns/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/task' element={<Tasks/>}></Route>
            <Route path='/mockTest' element={<Test/>}></Route>
            <Route path='/Blog' element={<Blog/>}></Route>
            <Route path='/package' element={<PurchagePakages/>}></Route>
            <Route path='/packageDetails/:id' element={<PurchagePackageDetails/>}></Route>
            <Route path='/blogdetails' element={<BlogDetails/>}></Route>
            <Route path='/BlogDetailsById/:id' element={<BlogById/>}></Route>
            <Route path='/BharatSAT' element={<BharatSAT/>}></Route>
            <Route path='/create-exam' element={<CreateExam/>}></Route>
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
