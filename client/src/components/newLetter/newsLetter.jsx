import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import './newsLetter.css'; // Assuming you have custom styles here
import { useAlert } from '../../context/AlertContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const showAlert = useAlert();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'newsletterSub'), {
        email: email,
        timestamp: serverTimestamp()
      });
  
      //show success alert
      showAlert("success", "Email added successfully!");
  
      // optional: clear the input field after sub
      setEmail("");
    } catch (error) {
      console.error("Error adding email to Firestore: ", error);
      showAlert("error", "Failed to add email. Please try again later.");
    }
  };

  return (
    <div className='newsCss'>
      <img src={require('../../assets/mental.webp')} alt="" />
      <div className='formSet'>
        <h1>Sign Up For our newsletter</h1>
        <p>I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            fullWidth 
            inputProps={{ style: { padding: '10px' } }}
            value={email}
            onChange={handleInputChange}
            required
          />
          <Button type='submit' variant="contained" color="primary" >Subscribe Now</Button>
          
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
