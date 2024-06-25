import './App.css';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './pages/Home';
import Register from './pages/key/register';
import Login from './pages/key/login';
import { AlertProvider } from './context/AlertContext';
import About from './pages/About';
import Department from './pages/Department';
import Contact from './pages/Contact';


function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about-us' element={<About/>}/>
          <Route path='/department' element={<Department/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
    </AlertProvider>
  );
}

export default App;
