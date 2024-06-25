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
            <img className='navImg' src={require("../../assets/main-logo.png")} alt="" />
            <div className={`nav ${navOpen ? 'open' : 'closed'}`}>
                <h5 onClick={toggleNav}><FaTimes/></h5>
                <Link to="/" className={window.location.pathname === "/" ? "active" : "nav-link"}>Home</Link>
                <Link to="/about-us" className={window.location.pathname === "/about-us" ? "active" : "nav-link"}>About-us</Link>
                <Link to="/department" className={window.location.pathname === "/department" ? "active" : "nav-link"}>Department</Link>
                <Link to="/contact-us" className={window.location.pathname === "/contact-us" ? "active" : "nav-link"}>Contact Us</Link>
                {currentUser && currentUser.role === 'admin' ? (
                    <Link to={`/admin-dashboard-${currentUser.userId}`} className={window.location.pathname === "/admin-dashboard" ? "active" : "nav-link"}>Admin-dashboard</Link>
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