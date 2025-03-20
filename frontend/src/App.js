import './App.css';

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

import { useAth } from './hooks/useAuth';

import Home from './pages/home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile.js';
import Photo from './pages/Photo/Photo.js';
import Search from './pages/Search/Search.js';


function App() {

  const {auth, loading} = useAth()

  if(loading){
     return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login"/>}/>
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login"/>}/>
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!auth ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/register" element={!auth ? <Register/> : <Navigate to="/"/>}/>
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/login"/>}/>
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
