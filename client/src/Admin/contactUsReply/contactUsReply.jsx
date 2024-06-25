import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import "./contactUsReply.css"
import { useAlert } from '../../context/AlertContext';
import { FaClipboard } from 'react-icons/fa';

const ContactUsReply = () => {
    const [ContactUsReply, setContactUsReply] = useState([]);
    const sendAlert = useAlert();

    useEffect(() => {
        const fetchCOntactUsReply = async () => {
            const querySnapshot = await getDocs(collection(db, 'contactInfo'));
            const sub = querySnapshot.docs.map(doc => doc.data());
            setContactUsReply(sub);
        }

        fetchCOntactUsReply();
    }, [])

    const copyClipboard = (email) => {
        navigator.clipboard.writeText(email);
        sendAlert("success",'Email copied to clipboard!');
      };


  return (
    <div className='CUWrapper'>
        <Navbar/>
        <div className='Contact-info'>
            {ContactUsReply.map((contactUs, index) => (
                <div key={index} className='contact-item'>
                    <>
                        <p>{contactUs.name}</p>
                        <p><FaClipboard color='#007BFF' className='clipboard' onClick={() => copyClipboard(contactUs.email)}/> {contactUs.email}</p>
                        <strong>{contactUs.subject}</strong>
                        <i>{contactUs.message}</i>
                        <i>{contactUs.timestamp.toString()}</i>
                    </>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ContactUsReply