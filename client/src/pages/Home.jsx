// src/components/SomeComponent.js

import React from "react";
import Navbar from "../components/Navbar/navbar";
import Carousel from "../components/Carousel/Carousel";
import BuildBox from "../components/BuildBox/BuildBox";
import "./Home.css"
import AppointmentBadge from "../components/AppointmentBadge/AppointmentBadge";
import HealthDisplay from "../components/healthDisplay/HealthDisplay";
import NewsLetter from "../components/newLetter/newsLetter";
import Footer from "../components/Footer/Footer";

const Home = () => {
    
    return (
        <div className="HomeWrapper">
            <Navbar/>
            <Carousel/>
            <div className="BuildBox">
                <BuildBox/>
            </div>
            <AppointmentBadge/>
            <HealthDisplay/>
            <NewsLetter/>
            <Footer/>
        </div>
    );
};

export default Home;
