import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Axios from "axios";

function Spinner() {
    Axios.defaults.withCredentials = true;
    
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };
    
    useEffect(() => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
            if (!response.data[0].person_id && !response.data[0].username) {
                navigateToLogin();
            }
        })
    }, []);
    return (
        <div className='spinner'>
            <ReactLoading type="spin" color="rgba(138, 43, 226)" height={150} width={70} />
        </div>
    );
}

export default Spinner;