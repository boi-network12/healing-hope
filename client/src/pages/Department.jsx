import React from 'react'
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/Footer'
import DepartmentHeader from '../components/DepartmentHeader/DepartmentHeader'
import DepartmentOffer from '../components/Offer/DepartmentOffer'

const Department = () => {
  return (
    <div>
        <Navbar/>
        <DepartmentHeader/>
        <DepartmentOffer/>
        <Footer/>
    </div>
  )
}

export default Department