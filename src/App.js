
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Authentication from './Componetns/Authentication/Authentication';
import Login from './Componetns/Authentication/Login';
import Register from './Componetns/Authentication/Register';
import './Styles/Layout.css'
import Otp from './Componetns/Authentication/Otp';
import ForgetPass from './Componetns/Authentication/ForgetPass';
import './App.css'
// import Navbar from './Componetns/Navbar';
import MainLayout from './MainLayout';
import Home from './Componetns/Home';
// import Sidebar from './Componetns/Sidebar';
import Userdata from './Componetns/Layout/Userdata';
import AgencyRoom from './Componetns/Agency/AgencyRoom';
import EmailFunctionality from './Componetns/Campaign/EmailFunctionality';
import Campigns from './Componetns/Campaign/Campigns';
import Dashboard from './Componetns/Layout/Dashboard';
import Tasks from './Componetns/Tasks/Tasks';
import Test from './Componetns/Tasks/Test';
import Blog from './Componetns/Blog/Blog';
import PurchagePakages from './Componetns/Packages/PurchagePakages';
import BlogDetails from './Componetns/Blog/BlogDetails';
import BlogById from './Componetns/Blog/BlogById';
import PurchagePackageDetails from './Componetns/Packages/PurchagePackageDetails';
import BharatSAT from './Componetns/BharatSAT/BharatSAT';
import CreateExam from './Componetns/BharatSAT/CreateExam';
import ViewExam from './Componetns/BharatSAT/ViewExam';


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
            <Route path='/view-exam' element={<ViewExam/>}></Route>
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
