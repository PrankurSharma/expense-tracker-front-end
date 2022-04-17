import React from 'react';
import ReactLoading from 'react-loading';

function Spinner(){
    return (
        <ReactLoading type="spin" color="rgba(138, 43, 226)" height={150} width={70} />
    );
}

export default Spinner;