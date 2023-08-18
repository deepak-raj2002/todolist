import React from "react";
import logo from '../Assets/logo.png';
import './Header.scss';
const Header=()=>{
    return(
        <div className="header">
        <div className="logo-name">
        <img src={logo} className="header-logo"/>
        <h3 className="name">TaskFlow</h3>
        </div>
        {/* <button className="strt-btn">Get Started</button> */}
        </div>
    )
};

export default Header;