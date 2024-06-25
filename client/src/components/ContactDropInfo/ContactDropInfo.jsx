import React, { useState } from 'react';
import './ContactDropInfo.css';
import { useAlert } from '../../context/AlertContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const ContactDropInfo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const showAlert = useAlert();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'contactInfo'), {
                name,
                email,
                subject,
                message,
                timestamp: serverTimestamp(),
            });

            // Show success alert 
            showAlert('success', 'Message sent successfully');

            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error sending the message ', error);
            showAlert('error', 'Message could not be sent!');
        }
    };

    return (
        <div className='contactWrapper'>
            <iframe
                title='Location Map'
                width='100%'
                height='100%'
                frameBorder='0'
                style={{ border: 0 }}
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.1234591669803!2d-97.11381868480716!3d32.57930998099924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e798ded8eeb13%3A0xd13878bf1b186a57!2s733%20Highway%20287%20N%2C%20Mansfield%2C%20TX%2076063%2C%20USA!5e0!3m2!1sen!2sca!4v1624591234567!5m2!1sen!2sca'
                allowFullScreen=''
            ></iframe>
            <div className='address'>
                <h2>Our Location</h2>
                <aside>
                    <p>733 Highway 287 N, Suite</p>
                    <p>403 Mansfield, Tx 76063-3867</p>
                </aside>
                <aside>
                    <p>Tel: 469-225-3670</p>
                    <p>Fax: 469-225-3670</p>
                </aside>
                <aside>
                    <p>info@healing-hope.com</p>
                </aside>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Full Name:</label>
                        <input
                            type='text'
                            value={name}
                            required
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            value={email}
                            required
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='subject'>Subject:</label>
                        <input
                            type='text'
                            value={subject}
                            required
                            onChange={handleSubjectChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='message'>Message:</label>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            cols='30'
                            rows='10'
                            required
                        ></textarea>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactDropInfo;
