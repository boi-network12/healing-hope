import React, { useState } from 'react'
import "./HealthDeclaration.css"
import { Checkbox, Input } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { db } from "../../FirebaseConfig"
import { useAlert } from '../../context/AlertContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const HealthDeclaration = ({ onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bodyTemperature: false,
        fluSymptoms: '',
        elaborate: '',
        selectedDate: '',
        initials: '',
        confirmation: false,
      });
      const sendAlert = useAlert();

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'healthDeclaration'), {
                timestamp: serverTimestamp(),
                ...formData,
            });
            setFormData('')
            sendAlert("success", "sent!");
        } catch (error) {
            console.error('Error adding document: ', error);
            sendAlert("error", "Failed to submit form. Please try again later.")
        }
        
      }

      const handleChange = (e) => {
        const { name, value, type, checked} = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({...formData, [name]: val})
      }


  return (
    <div onClick={onClose} className='HDWrapper'>
        <div className='bg-navbar' onClick={(e) => e.stopPropagation()}>
        <span onClick={onClose}><FaTimes/></span>
            <h1>Health Declaration</h1>
            <p>Please fill out the following health declaration form in order to participate in our activity. Submissions are valid up to 24 hours prior to the activity.</p>

            <form onSubmit={handleSubmit}>
                <div className='inputTwo'>
                    <div className='inputTag'>
                        
                        <label htmlFor='firstName'>First Name: </label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='inputTag'>
                        <label htmlFor='lastName'>Last Name: </label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='inputTag'>
                    <label htmlFor='email'>Email: </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <p><Checkbox
                    id="bodyTemperature"
                    name="bodyTemperature"
                    checked={formData.bodyTemperature}
                    onChange={handleChange}
                /> My body temperature is lower than 98.6°F/37.5°C</p>
                <div className='radioDiv'>
                    <p>Are you experiencing any flu symptoms?</p>
                        <p>
                            <input
                                type="radio"
                                id="fluSymptomsYes"
                                name="fluSymptoms"
                                value="yes"
                                checked={formData.fluSymptoms === 'yes'}
                                onChange={handleChange}
                            /> yes
                        </p>
                    <p>
                        <input 
                            type="radio"
                            id="fluSymptomsNo"
                            name="fluSymptoms"
                            value="no"
                            checked={formData.fluSymptoms === 'no'}
                            onChange={handleChange}
                        /> No
                    </p>
                </div>
                <div>
                    <div className='inputTag'>
                        <label htmlFor='elaborate'>Please elaborate: </label>
                        <Input
                            type="text"
                            id="elaborate"
                            name="elaborate"
                            value={formData.elaborate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputTwo'>
                        <div className='inputTag'>
                            <label htmlFor='date'>select a date: </label>
                            <Input 
                                type='date'
                                id="selectedDate"
                                name="selectedDate"
                                value={formData.selectedDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='inputTag'>
                            <label htmlFor='initials'>Initials: </label>
                            <Input
                                type="text"
                                id="initials"
                                name="initials"
                                value={formData.initials}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <p><Checkbox
                    id="confirmation"
                    name="confirmation"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    required
                /> I confirm that the information given in this form is true</p>
                <button>submit</button>
            </form>
        </div>
    </div>
  )
}

export default HealthDeclaration