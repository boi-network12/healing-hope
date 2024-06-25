import React from 'react'
import "./Doctors.css"
import Doc1 from "../../assets/doctor-1.jpg"
import Doc2 from "../../assets/doctor-2.jpg"
import Doc3 from "../../assets/doctor-3.jpg"


const Doctors = () => {
    const boxText = [
        {
            id: 1,
            img: Doc1,
            name: "Dr. Smith",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
        },
        
        {
            id: 2,
            img: Doc2,
            name: "Dr. Amelia Write",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
        },
        {
            id: 3,
            img: Doc3,
            name: "Dr. Anthony Robins",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
        },

    ]
  return (
    <div className='docWrapper'>
        <h1>Providing you with the best doctors for the best care</h1>
        <div className="doctorBox">
            {boxText.map(item => (
                <div key={item.id} className="doctor">
                    <img src={item.img} alt=''/>
                    <h2>{item.name}</h2>
                    <p>{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Doctors