import React from 'react'
import Logo from "../assets/img/logo.png"
import Menu from './Menu'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar__container">
            <img src={Logo} className='sidebar__logo'/>
            <Menu/>
        </div>
    </div>
  )
}


