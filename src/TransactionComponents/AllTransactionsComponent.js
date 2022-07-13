import React, { useEffect } from 'react';
import Axios from 'axios';

function AllTransactionsComponent({smallLoad, updateMoney}) {
    useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/get').then((response) => {
			updateMoney(response.data);
		});
	}, [smallLoad]);

    return (
        <></>
    );
}
export default AllTransactionsComponent;