import React from 'react'
import "./AppointmentBadge.css"
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AppointmentBadge = () => {
  return (
    <div className='appB'>
      <h1><FaChevronRight/> Schedule your appointment online</h1>
      <Link>
      Book appointment
      </Link>
    </div>
  )
}

export default AppointmentBadge