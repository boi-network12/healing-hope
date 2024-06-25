import React from 'react'
import "./BuildBox.css"
import { Link } from 'react-router-dom'

const TextBox = [
    {
        id: 1,
        fText: "Cardiology",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users grt to know you.",
        buttonD: "/about-us"
    },
    {
        id: 1,
        fText: "Cardiology",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users grt to know you.",
        buttonD: "/about-us"
    },
    {
        id: 1,
        fText: "Cardiology",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users grt to know you.",
        buttonD: "/about-us"
    },
]

const BuildBox = () => {
  return (
    <div className='boxWrapper'>
        {
            TextBox.map(item => (
                <div key={item.id} className='box'>
                    <h1>{item.fText}</h1>
                    <p>{item.jText}</p>
                    <Link to={item.buttonD}>
                        <button>
                            Read More
                        </button>
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default BuildBox