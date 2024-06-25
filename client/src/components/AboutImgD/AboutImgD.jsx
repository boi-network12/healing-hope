import React from 'react'
import "./AboutImgD.css"


const AboutImgD = () => {
  return (
    <div className='AboutImgD'>
        <img src={require("../../assets/side-img.jpg")} alt="owner img" />
        <div className='desc'>
            <h1>about the medical clinic </h1>
            <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>

            <p>This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide.</p>
        </div>
    </div>
  )
}

export default AboutImgD