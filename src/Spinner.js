import React from 'react';
import ReactLoading from 'react-loading';

function Spinner(){
    return (
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
    );
}

export default Spinner;