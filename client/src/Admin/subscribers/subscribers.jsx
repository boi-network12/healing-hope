import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { FaClipboard } from 'react-icons/fa';
import { useAlert } from '../../context/AlertContext';
import "./subscribers.css"

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const sendAlert = useAlert();

  useEffect(() => {
    const fetchSubscribers = async () => {
      const querySnapshot = await getDocs(collection(db, 'newsletterSub'));
      const sub = querySnapshot.docs.map(doc => doc.data());
      setSubscribers(sub);
    }

    fetchSubscribers();
  },[]);

  const copyClipboard = (email) => {
    navigator.clipboard.writeText(email);
    sendAlert("success",'Email copied to clipboard!');
  };
  
  return (
    <div>
        <Navbar/>
        <div className='subscribers'>
          <h1>Subscribers</h1>
          {subscribers.map((subscriber, index) => (
            <li  key={index} className='subscriber-item'>
              {subscriber.email}
              <button onClick={() => copyClipboard(subscriber.email)}>
                <FaClipboard/>
              </button>
            </li>
          ))}
        </div>
    </div>
  )
}

export default Subscribers