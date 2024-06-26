import React, { useState } from 'react'
import {  FaMapMarkerAlt, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { IoWarningOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';
import "./navbar.css"
import { useAuth } from '../../context/authContaxt';
import { getPlaceholderImage } from '../../utils/utils';
import UserProfileModal from '../../modal/UserProfileModel';
import HealthDeclaration from '../HealthDeclaration/HealthDeclaration';


const Navbar = () => {
    const { currentUser } = useAuth();
    const photoURL = currentUser && currentUser.photoURL ? currentUser.photoURL : getPlaceholderImage(currentUser ? currentUser.fullName || currentUser.username || currentUser.email : "");
    const [navOpen, setNavOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [healthDeclarationOpen, setHealthDeclarationOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }   

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleHealthDeclaration = () => {
        setHealthDeclarationOpen(!healthDeclarationOpen);
    }


  return (
    <div className='navbarWrapper'>
        <div className='warningN'>
            <p><IoWarningOutline/> we're committed to a clean and safe facility. <i onClick={toggleHealthDeclaration}>Submit</i> your health declaration</p>
        </div>
        <div className='contactN'>
            <p><FaMapMarkerAlt color='#0693e3'/> 733 Highway 287 N, Suite 403 Mansfield, Tx 76063-3867</p>
            <p><FaPhone color='#0693e3'/> 469-225-3670</p>
        </div>
        <div className='navbarImage' >
            <Link to="/"><img className='navImg' src={require("../../assets/main-logo.png")} alt="" /></Link>
            <div className={`nav ${navOpen ? 'open' : 'closed'}`}>
                <h5 onClick={toggleNav}><FaTimes/></h5>
                <Link to="/" className={window.location.pathname === "/" ? "active" : "nav-link"}>Home</Link>
                <Link to="/about-us" className={window.location.pathname === "/about-us" ? "active" : "nav-link"}>About-us</Link>
                <Link to="/department" className={window.location.pathname === "/department" ? "active" : "nav-link"}>Department</Link>
                <Link to="/contact-us" className={window.location.pathname === "/contact-us" ? "active" : "nav-link"}>Contact Us</Link>
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/admin-dashboard/${currentUser.uid}`} className={window.location.pathname === `/admin-dashboard/${currentUser.uid}` ? "active" : "nav-link"}>Admin-dashboard</Link>
                ) : (
                    null
                )}

                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/subscribers/${currentUser.uid}`} className={window.location.pathname === `/subscribers/${currentUser.uid}` ? "active" : "nav-link"}>Subscribers</Link>
                ) : (
                    null
                )}
                
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/contact-us-reply/${currentUser.uid}`} className={window.location.pathname === `/contact-us-reply/${currentUser.uid}` ? "active" : "nav-link"}>contact Us Reply</Link>
                ) : (
                    null
                )}

                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/health-declaration-review/${currentUser.uid}`} className={window.location.pathname === `/health-declaration-review/${currentUser.uid}` ? "active" : "nav-link"}>Health Declaration Review</Link>
                ) : (
                    null
                )}
                
                {currentUser && currentUser.role === 'user' ? (
                    <Link to={`/career/${currentUser.uid}`} className={window.location.pathname === `/career/${currentUser.uid}` ? "active" : "nav-link"}>Admit Career</Link>
                ) : (
                    null
                )}
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/post-career/${currentUser.uid}`} className={window.location.pathname === `/post-career/${currentUser.uid}` ? "active" : "nav-link"}>Post Career</Link>
                ) : (
                    null
                )}

                
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/application-review/${currentUser.uid}`} className={window.location.pathname === `/application-review/${currentUser.uid}` ? "active" : "nav-link"}>Application Review</Link>
                ) : (
                    null
                )}

                
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/article/${currentUser.uid}`} className={window.location.pathname === `/article/${currentUser.uid}` ? "active" : "nav-link"}>Article</Link>
                ) : (
                    null
                )}

                
                {currentUser && currentUser.role === 'user' ? (
                    <Link to={`/news/${currentUser.uid}`} className={window.location.pathname === `/news/${currentUser.uid}` ? "active" : "nav-link"}>News</Link>
                ) : (
                    null
                )}

                
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/news/${currentUser.uid}`} className={window.location.pathname === `/news/${currentUser.uid}` ? "active" : "nav-link"}>News</Link>
                ) : (
                    null
                )}

                
            </div>
           <aside>
           {currentUser ? (
             <span onClick={toggleModal}>
                <img src={photoURL} alt="" />
                {currentUser.fullName || currentUser.username || currentUser.email}
            </span>
           ) : (
            <Link to="/login">Login</Link>
           )}
            <p onClick={toggleNav}>
                <FaBars/>
            </p>
           
           </aside>
        </div>
        {modalOpen && <UserProfileModal onClose={toggleModal}/>}
        {healthDeclarationOpen && <HealthDeclaration onClose={toggleHealthDeclaration}/>}
    </div>
  )
}

export default Navbar