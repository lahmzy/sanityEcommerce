import React from 'react'
import {AiFillInstagram,AiOutlineTwitter} from "react-icons/ai"

const Footer = () => {

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  return (
    <div className='footer-container'>
      <p> &copy; {currentYear} Lahmzy Ultra Modern Commerce, All rights reserved </p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer
