import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
};

export default BackButton;
