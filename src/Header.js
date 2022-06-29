import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Header() {
    const [user_id, setuser_id] = useState("");
    const [user_name, setuser_name] = useState("");
    Axios.defaults.withCredentials = true;
    
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
            if (response.data[0].person_id && response.data[0].username) {
                setuser_id(response.data[0].person_id);
                setuser_name(response.data[0].username);
            }
        })
    }, []);

    const checkLogin = () => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
            if (response.data[0].person_id && response.data[0].username) {
                setuser_id(response.data[0].person_id);
                setuser_name(response.data[0].username);
            }
        });
    }

    const logout = () => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/logout').then((response) => {
            alert("Please click OK to proceed logging out.");
            navigateToLogin();
        }).catch((err) => {
            alert(err);
        });
    }
    return (
        <div>
            <div>
                <Link to ="/">
                    <img src='/logo.png' alt="Finer" />
                </Link>
            </div>
            <div className="divhead">
                <h1 className="head"> Hi {user_name}, </h1>
                {!user_name.length ? null : <button className="button" onClick={() => {
                    checkLogin();
                    logout();
                }}> Logout </button>}
            </div>
        </div>
    );
}
export default Header;