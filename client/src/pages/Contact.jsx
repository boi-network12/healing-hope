import React from 'react'
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/Footer'
import ContactHeader from '../components/ContactHeader/ContactHeader'
import ContactDropInfo from '../components/ContactDropInfo/ContactDropInfo'

const Contact = () => {
  return (
    <div>
        <Navbar/>
        <ContactHeader/>
        <ContactDropInfo/>
        <Footer/>
    </div>
  )
}

export default Contact