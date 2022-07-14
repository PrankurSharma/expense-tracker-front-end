import React from 'react';
import ReactLoading from 'react-loading';
import Axios from "axios";

function Spinner() {
    Axios.defaults.withCredentials = true;

    return (
        <div className='spinner'>
            <ReactLoading type="spin" color="rgba(138, 43, 226)" height={150} width={70} />
        </div>
    );
}

export default Spinner;