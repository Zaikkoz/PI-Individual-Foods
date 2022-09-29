import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';


export default function LandingPage() {
    return (
        <div className="landingBackground">
            <div className="landing">
                <h1 className="welcomeMsg">¡Mas de 5000 recetas a tu disposicion!</h1>
                <Link to='/home' id="click">
                    <button className="homeButton">¡Vamos!</button>
                </Link>
            </div>
        </div>
    )
}
