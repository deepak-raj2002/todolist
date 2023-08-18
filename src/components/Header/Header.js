import React from "react";
import logo from '../Assets/logo.png';
import { Link } from "react-router-dom";
import './Header.scss';
const Header=()=>{
    return(
        <div className="header">
        <div className="logo-name">
        <Link to="/">
        <img src={logo} className="header-logo"/>
        </Link>
        <h3 className="name">TaskFlow</h3>
        </div>
        {/* <button className="strt-btn">Get Started</button> */}
        </div>
    )
};

export default Header;