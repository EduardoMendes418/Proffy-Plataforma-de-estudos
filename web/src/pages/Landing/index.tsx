import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

import './style.css';

function Landing(){

    //CHAMANDO API TOTAL DE CONEXAO
    const [ totalConnections, setTotalConnections] = useState(0);
    useEffect(() => {
        api.get('connections').then(Response => {
            const { total } = Response.data;

            setTotalConnections(total);

        })
    }, []);


    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingImg} alt="plataforma de estudos" className="hero-image"/>

                <div className="button-container">
                    
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar" />
                        Aulas
                    </Link>
                </div>

                <span className="total-conections">
                    Total de {totalConnections} conexões ja realizada <img src={purpleHeartIcon} alt="Coracao roxo"/>
                </span>


            </div>
        </div>

    )

}


export default Landing;