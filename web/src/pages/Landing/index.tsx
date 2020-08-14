import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import logoImg from '../../assets/images/landing.svg';
import StudyIncon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import {Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
function Landing(){
    const [totalconections, setotalconections] = useState(0);
    useEffect(() => {
    api.get('/connections').then(response => {
       const { total } = response.data;
       setotalconections(total);
    })
    },[])

    return (
        <div id="page-landing">
           <div id="page-landing-content" className="container">
               <div className="logo-container">
                   <img src={logo} alt="Proffy"/>
                   <h2>Sua plataforma de estudos online</h2>
               </div>
               <img src={logoImg} 
               alt="Plataforma de esudos"
               className="hero-image"
               />
               <div className="buttons-container">
                    <Link to="/study" className="study">
                    <img src={StudyIncon} 
                    alt="Estudar"
                    />
                    Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                    <img src={giveClassesIcon} 
                    alt="Dar aulas"/>
                    Dar aulas
                    </Link>
               </div>
               <span className="total-conections">
                    total de {totalconections} conexoes ja realizadas <img src={purpleHeartIcon} alt="coração roxo"/>
                </span>
           </div>
          
        </div>
    )
}

export default Landing;