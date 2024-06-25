import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import "./userDisplay.css";

const UserDisplay = ({ users }) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const initialDisplayCount = 4; // Number of users to display initially

  // Function to format Firestore timestamp
  const formatTimestamp = (timestamp) => {
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return date ? new Date(date).toLocaleString() : "";
  };

  // Function to toggle showing all users
  const toggleShowAllUsers = () => {
    setShowAllUsers(prev => !prev);
  };

  return (
    <div className='userWrapper'>
      <h1>User Display (number of users: {users.length})</h1>
      <div className='userTable'>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Hospital ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Reg No</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, showAllUsers ? users.length : initialDisplayCount).map(user => (
              <tr key={user.id}>
                <td><img src={user.photoURL} alt="" /></td>
                <td>{user.hospitalId}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.fullName}</td>
                <td>{user.phoneNumber || "..."}</td>
                <td>{user.username}</td>
                <td>{user.regNo || user.hospitalId}</td>
                <td>{formatTimestamp(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > initialDisplayCount && (
        <div>
          <button onClick={toggleShowAllUsers}>
            {showAllUsers ? 'Show Less' : 'Show More'}
          </button>
          <span>{showAllUsers ? `Showing all ${users.length} users` : `Showing ${initialDisplayCount} of ${users.length}`}</span>
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
