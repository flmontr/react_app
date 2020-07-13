import React from 'react'
import {Link} from 'react-router-dom'

import './Navbar.css'

const Navbar = props => {

  return(
    <div id="navbar" className="navbar ui top fixed borderless menu">
        <Link to='/' className="item">
            <i className="material-icons">restaurant_menu</i>
        </Link>
        <Link to='/make' className="item">
            <i className="material-icons">local_pizza</i>
        </Link>
        <Link to='/about' className="item">
            <i className="material-icons"></i>
            Sobre
        </Link>
    </div>
  )
}

export default Navbar
