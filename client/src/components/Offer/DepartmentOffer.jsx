import React from 'react'
import "./DepartmentOffer.css"
import Doc1 from "../../assets/cardiology.webp"
import Doc2 from "../../assets/neurolgy.webp"
import Doc3 from "../../assets/orthopedics.webp"
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'


const DepartmentOffer = () => {
    const DText = [
        {
            id: 1,
            img: Doc1,
            name: "Cardiology",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
            buttonDirectory: "/"
        },
        
        {
            id: 2,
            img: Doc2,
            name: "Neurology",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
            buttonDirectory: "/"
        },
        {
            id: 3,
            img: Doc3,
            name: "Orthopedics",
            desc: "I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.",
            buttonDirectory: "/"
        },

    ]
  return (
    <div className='docWrapper'>
        <h1>Providing you with the best doctors for the best care</h1>
        <div className="doctorBox">
            {DText.map(item => (
                <div key={item.id} className="doctor">
                    <img src={item.img} alt=''/>
                    <h2>{item.name}</h2>
                    <p>{item.desc}</p>
                    <Link to={item.buttonDirectory}><FaChevronRight/> Read More </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DepartmentOffer