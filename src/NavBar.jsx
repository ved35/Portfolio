import React from 'react'
import './Navbar.css'
import $ from 'jquery'

function NavBar() {
  
  return (
    <header className='container navposition'>
      <div className="navbar">
        <div className="profile">
          <div className="logo">
            <img src={require('./utilities/profile.jpg')} alt="" width='50' height='50' />
          </div>
          <div className="namepro">
            Rio
          </div>
        </div>

        <div className="rightnav">
          <ul className="listitem">
            <li className='nav-item'><a href="#" className='nav-link active'>Home</a></li>
            <li className='nav-item'><a href="#" className='nav-link'>About</a></li>
            <li className='nav-item'><a href="#" className='nav-link'>Skill</a></li>
            <li className='nav-item'><a href="#" className='nav-link'>Projects</a></li>
            <li className='nav-item'><a href="#" className='nav-link'>Resume</a></li>
            <li className='nav-item'><a href="#" className='nav-link'>Contact</a></li>
          </ul>
        </div>
      </div>
      
    </header>

  )
}

export default NavBar