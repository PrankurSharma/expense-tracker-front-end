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

    const logout = () => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/logout').then((response) => {
            navigateToLogin();
        }).catch((err) => {
            alert(err);
        });
    }
    
    useEffect(() => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
            if (response.data.message) {
                logout();
                alert(response.data.message);
            }
            else if (response.data.error){
                navigateToLogin();
                alert("Please login to continue.");
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