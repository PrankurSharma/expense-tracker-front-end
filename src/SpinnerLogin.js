import React, { useState, useEffect } from "react";
import Axios from "axios";
import Spinner from "./Spinner";
import CrudSpeechlyPDF from "./CrudSpeechlyPDF";
function SpinnerLogin(){
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
            if (!response.data[0].person_id && !response.data[0].username) {
                window.location.href = '/login';
            }
            else{
                window.location.href = '/home';
            }
        })
    }, []);
    return (
        <div>
            <Spinner />
        </div>
    );
}
export default SpinnerLogin;