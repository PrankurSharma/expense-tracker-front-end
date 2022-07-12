import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';
import Spinner from "./Spinner";
import jsPdfGenerator from './JSPDFGenerator';
import DeleteUpdate from './DeleteUpdate';
function AllTransactions() {
	const [money, set_money] = useState([]);
	const [totalincome, settotal_income] = useState("");
	const [totalexpense, settotal_expense] = useState("");
	const [loading, setLoading] = useState(true);
	const [smallLoad, setSmallLoad] = useState(true);
	Axios.defaults.withCredentials = true;
	
	function handleChange(newValue) {
		setLoading(newValue);
	}

	function handleSmallLoad(newValue) {
		setSmallLoad(newValue);
	}

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalincome').then((response) => {
			settotal_income(response.data[0].amTotal);
		});
	}, [smallLoad]);

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalexpense').then((response) => {
			settotal_expense(response.data[0].amTotal);
		});
	}, [smallLoad]);

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/get').then((response) => {
			set_money(response.data);
		});
	}, [smallLoad]);

	const navigate = useNavigate();

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner onChange={handleChange}/>);
	}
	else {
		return (
			<div className='App'>
				<Header />
				<h1 className='head'> All Transactions </h1>
				<h1 className="record"> Income: ₹ {totalincome} </h1>
				<h1 className="record"> Expenses: ₹ {totalexpense} </h1>
				<div>
                    <h1 className='head'> Transaction Results </h1>
                </div>
				{!money.length ? <div> <h1 className='head'> No transactions found. </h1> </div> : <div className="containertrans">
					<div className="alltransactions">
						<DeleteUpdate money={money} handleSmallLoad={handleSmallLoad}/>
					</div>
				</div>}
				<div>
					{!money.length ? null : <button className="button" onClick={jsPdfGenerator}> Generate PDF For All Transactions </button>}
					<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
				</div>
			</div>
		);
	}
}
export default AllTransactions;