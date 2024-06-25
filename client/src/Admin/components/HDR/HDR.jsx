import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import './HDR.css'; // Import the CSS file for styling

const HDR = () => {
    const [HDR, setHDR] = useState([]);
    const [open, setOpen] = useState(null); // To manage which PDF is open

    const componentRef = useRef();

    useEffect(() => {
        const fetchHDR = async () => {
            const querySnapshot = await getDocs(collection(db, 'healthDeclaration'));
            const sub = querySnapshot.docs.map(doc => doc.data());
            setHDR(sub);
        }

        fetchHDR();
    },[]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className='hdr-container'>
            {HDR.map((item, index) => (
                <div key={index} className={`pdf-container ${open === index ? 'open' : ''}`} ref={open === index ? componentRef : null}>
                    <h1 onClick={() => setOpen(open === index ? null : index)} className='pdf-header'>
                        {item.firstName} {open === index ? <FaChevronUp /> : <FaChevronDown />}
                    </h1>
                    {open === index && (
                        <div className='pdf-content'>
                            <p className='pdf-paragraph'><strong>Last Name:</strong> {item.lastName}</p>
                            <p className='pdf-paragraph'><strong>Email:</strong> {item.email}</p>
                            <p className='pdf-paragraph'><strong>Body Temperature:</strong> {item.bodyTemperature}</p>
                            <p className='pdf-paragraph'><strong>Flu Symptoms:</strong> {item.fluSymptoms}</p>
                            <p className='pdf-paragraph'><strong>Elaborate:</strong> {item.elaborate}</p>
                            <p className='pdf-paragraph'><strong>Selected Date:</strong> {item.selectedDate}</p>
                                                        <p className='pdf-paragraph'><strong>Initials:</strong> {item.initials}</p>
                        </div>
                    )}
                </div>
            ))}
            <button onClick={handlePrint} className='print-button'>
                Print PDF
            </button>
        </div>
    );
}

export default HDR;
