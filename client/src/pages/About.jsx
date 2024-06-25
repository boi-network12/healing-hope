import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/navbar'
import AboutHeader from '../components/AboutHeader/AboutHeader'
import AboutImgD from '../components/AboutImgD/AboutImgD'
import Doctors from '../components/Doctors/Doctors'

const About = () => {
  return (
    <div>
        <Navbar/>
        <AboutHeader/>
        <AboutImgD/>
        <Doctors/>
        <Footer/>
    </div>
  )
}

export default About