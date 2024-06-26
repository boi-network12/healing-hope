import './App.css';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './pages/Home';
import Register from './pages/key/register';
import Login from './pages/key/login';
import { AlertProvider } from './context/AlertContext';
import About from './pages/About';
import Department from './pages/Department';
import Contact from './pages/Contact';
import AdminDashboard from './Admin/AdminDashboard';
import PrivateRoute from './Private/PrivateRoute';
import { useAuth } from './context/authContaxt';
import Subscribers from './Admin/subscribers/subscribers';
import ContactUsReply from './Admin/contactUsReply/contactUsReply';
import HealthDeclarationReview from './Admin/HealthDeclarationReview/HealthDeclarationReview';
import Profile from './pages/profile/profile';
import Career from './pages/Job/Career';
import PostCareer from './pages/post/PostCareer';
import ApplicationReview from './Admin/ApplicationReview/ApplicationReview';
import Article from './Admin/Article/Article';



function App() {
  const {currentUser} = useAuth();

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
          <>
            {currentUser && (
              <>
                <Route path={`/admin-dashboard/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <AdminDashboard/>
                  </PrivateRoute>
                }/>
                <Route path={`/subscribers/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <Subscribers />
                  </PrivateRoute>
                }/>
                <Route path={`/contact-us-reply/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <ContactUsReply/>
                  </PrivateRoute>
                }/>
                <Route path={`/health-declaration-review/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <HealthDeclarationReview/>
                  </PrivateRoute>
                }/>
                <Route path={`/profile/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <Profile/>
                  </PrivateRoute>
                }/>
                <Route path={`/career/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <Career/>
                  </PrivateRoute>
                }/>
                <Route path={`/post-career/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <PostCareer/>
                  </PrivateRoute>
                }/>
                <Route path={`/application-review/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <ApplicationReview/>
                  </PrivateRoute>
                }/>
                <Route path={`/article/${currentUser.uid}`} element={
                  <PrivateRoute>
                    <Article/>
                  </PrivateRoute>
                }/>
              </>
            )}
          </>
        </Routes>
    </Router>
    </AlertProvider>
  );
}

export default App;
