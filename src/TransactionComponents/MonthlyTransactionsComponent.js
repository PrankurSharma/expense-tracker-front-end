import React, { useEffect } from 'react';
import Axios from 'axios';

function MonthlyTransactionsComponent({smallLoad, updateMoney}) {
    useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthtrans').then((response) => {
			updateMoney(response.data);
		});
	}, [smallLoad]);
    return (
        <></>
    );
}
export default MonthlyTransactionsComponent;