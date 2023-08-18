import React from "react";
import TaskImg from '../Assets/TaskImg.jpg';
import { Link } from "react-router-dom";
import './Homepage.scss';
const HomePage = () => {
    return (
        <div className="home-page">
            <div>
                <div className="home-pg-content">
                    <h1 className="content-h">Welcome to TaskFlow<br></br> Your Ultimate To-Do List Website</h1>
                    <p className="content-p">Are you tired of juggling countless tasks, deadlines, and responsibilities? Look no further . TaskFlow is here to revolutionize the way you manage your to-do list. Our powerful and intuitive platform is designed to streamline your daily tasks, boost your productivity, and bring order to your chaotic schedule.</p>
                </div>
                <Link to="/task">
                <button className="content-btn">Get Started</button>
                </Link>
            </div>
            <div className="img-box">
                <img src={TaskImg} className="img"/>
            </div>
        </div>
    )
};

export default HomePage;