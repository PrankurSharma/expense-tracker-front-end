import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../Header';
import Spinner from "../Spinner";
import DeleteUpdate from '../InsertDeleteUpdateComponents/DeleteUpdate';
import jsPdfGenerator from '../JSPDFGenerator';
import TotalIncome from '../IncomeComponents/TotalIncome';
import TotalExpense from '../ExpenseComponents/TotalExpense';

function AllTransactions() {
	const [money, set_money] = useState([]);
	const [loading, setLoading] = useState(true);
	const [smallLoad, setSmallLoad] = useState(true);
	const [pdfcalled, setPdfCalled] = useState(false);
	Axios.defaults.withCredentials = true;
	
	function handleChange(newValue) {
		setLoading(newValue);
	}

	function handleSmallLoad(newValue) {
		setSmallLoad(newValue);
	}

	function genPDFSubmit(newValue) {
		setPdfCalled(newValue);
	}

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
		return (<Spinner handleChange={handleChange}/>);
	}
	else {
		return (
			<div className='App'>
				<Header />
				<h1 className='head'> All Transactions </h1>
				<TotalIncome smallLoad={smallLoad} />
				<TotalExpense smallLoad={smallLoad} />
				<div>
                    <h1 className='head'> Transaction Results </h1>
                </div>
				{!money.length ? <div> <h1 className='head'> No transactions found. </h1> </div> : <div className="containertrans">
					<div className="alltransactions">
						<DeleteUpdate money={money} handleSmallLoad={handleSmallLoad}/>
					</div>
				</div>}
				<div>
					{!money.length ? null : <button className="button" onClick={() => {
						genPDFSubmit((called) => !called);
					}}> Generate PDF For All Transactions </button>}
					{pdfcalled && <jsPdfGenerator money={money} genPDFSubmit={genPDFSubmit} />}
					<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
				</div>
			</div>
		);
	}
}
export default AllTransactions;