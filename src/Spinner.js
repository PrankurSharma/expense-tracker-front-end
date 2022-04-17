import React from 'react';
import ReactLoading from 'react-loading';

function Spinner(){
    return (
        <ReactLoading type="spin" color="#9370db" height={150} width={70} />
    );
}

export default Spinner;