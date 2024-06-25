import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar/navbar.jsx";
import UserDisplay from './components/usersDisplay/userDisplay.jsx';
import Chart from './components/Chart/Chart.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ background: "#f2f2f2" }}>
      <Navbar />
      <Chart users={users} />
      <UserDisplay users={users} />
    </div>
  );
};

export default AdminDashboard;
