import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Pin from "./pages/Pin";
// import Poc from "./pages/Poc";
import Register from "./pages/Register";
import TrendsWall from "./pages/TrendsWall";
import NewPost from "./pages/NewPost";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {


  const { pathname } = useLocation();

  return (
    <>


        {/* { pathname !== 'login' && <SideBar /> } */}

        {pathname !== '/Login' && pathname !== '/Register' 

        ?
       <div className="w-screen h-screen flex flex-row justify-start  bg-slate-100">   
       <div className=''>
       {/* Sidebar */}
       <SideBar/>
       
       </div>
   
       <div className='grow flex flex-col justify-start'>
       {/* Topbar */}
   
       <TopBar/>

       <Routes>
        <Route exact path="/" element={<Home/>}/>        
        <Route exact path="/Profile/:name" element={<Profile/>}/> 
        <Route exact path="/Search/:tag" element={<Search/>}/> 
        <Route exact path="/Pin/:id" element={<Pin/>}/>
        <Route exact path="/TrendsWall" element={<TrendsWall/>}/>
        <Route exact path="/NewPost" element={<NewPost/>}/>
        {/* <Route path="*" element={<Unknow/>}/>  */}

       </Routes>
   
   
       </div>
       </div>

       :
       <Routes>
        <Route exact path="/Login" element={<Login/>}/> 
        <Route exact path="/Register" element={<Register/>}/>
       </Routes>
        }
    
      

        


    
    

    

    
    <ToastContainer />
  
  </>
  );
}

export default App;
