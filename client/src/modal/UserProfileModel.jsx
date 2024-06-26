// UserProfileModal.js
import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './userProfileModal.css';
import { useAuth } from '../context/authContaxt';

const UserProfileModal = ({ onClose }) => {
    const { logout, currentUser } = useAuth();
    
    if (!currentUser) {
        return null; // Or handle the case where currentUser is not defined
    }
    return (
        <div className="modalBackdrop" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <div className="modalHeader">
                    
                </div>
                <div className="modalBody">
                    <Link to={`/profile/${currentUser.uid}`} className="modalItem">
                        <FaUserCircle /> Profile
                    </Link>
                    <Link to="/" onClick={logout} className="modalItem logout">
                        <FaSignOutAlt /> Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
