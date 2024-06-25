import React, { useEffect, useRef } from 'react'
import "./HealthDisplay.css"
import { FaChevronRight, FaRegUser, FaStethoscope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoChatboxOutline } from 'react-icons/io5'

const HealthDisplayText = [
    {
        id: 1,
        icon: <IoChatboxOutline />,
        fText: "Health Plans We Accept",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users get to know you.",
        buttonD: "/about-us"
    },
    {
        id: 2,
        icon: <FaRegUser />,
        fText: "Number 1 medical clinic in the Area ",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users get to know you.",
        buttonD: "/about-us"
    },
    {
        id: 3,
        icon: <FaStethoscope />,
        fText: "specialist Doctors",
        jText: "i'm a paragraph. Click here to add your own text and Edit me. Let your users get to know you.",
        buttonD: "/about-us"
    },
]

const HealthDisplay = () => {
    const boxRefs = useRef([])

    useEffect(() => {
        const currentBoxRefs = boxRefs.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        currentBoxRefs.forEach(box => {
            if (box) {
                observer.observe(box)
            }
        })

        return () => {
            currentBoxRefs.forEach(box => {
                if (box) {
                    observer.unobserve(box)
                }
            })
        }
    }, [])

    return (
        <div className='HealthD'>
            <h1>taking care of your health</h1>
            <div className='healthBox'>
                {HealthDisplayText.map((item, index) => (
                    <div
                        key={item.id}
                        className='box'
                        ref={el => boxRefs.current[index] = el}
                    >
                        <span>{item.icon}</span>
                        <h1>{item.fText}</h1>
                        <p>{item.jText}</p>
                        <Link to={item.buttonD}>
                            <FaChevronRight /> Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HealthDisplay
