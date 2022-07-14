import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Axios from "axios";
import { baseUrl } from './baseUrl';

function Spinner({ handleChange, fetchDetails }) {
    const [user_id, setuser_id] = useState("");
    const [user_name, setuser_name] = useState("");
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    const logout = () => {
        Axios.get(baseUrl + "/api/logout").then((response) => {
            navigateToLogin();
        });
    }

    useEffect(() => {
        Axios.get(baseUrl + "/api/login").then((response) => {
            if (response.data.message) {
                logout();
            }
            else if (response.data.error) {
                navigateToLogin();
                alert(response.data.error);
            }
            else {
                setuser_id(response.data[0].person_id);
                setuser_name(response.data[0].username);
                fetchDetails(user_id, user_name);
                handleChange(false);
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