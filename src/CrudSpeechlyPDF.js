import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ChartsIncome from './ChartsIncome';
import ChartsExpense from './ChartsExpense';
import Header from './Header';
import Spinner from "./Spinner";
import DeleteUpdate from "./DeleteUpdate";
import jsPdfGenerator from "./JSPDFGenerator";
import InsertEntries from './InsertEntries';

function CrudSpeechlyPDF() {

	const [monthincome, setmonth_income] = useState("");
	const [monthexpense, setmonth_expense] = useState("");
	const [monthmoney, setmonth_money] = useState([]);
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
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthtrans').then((response) => {
			setmonth_money(response.data);
		});
	}, [smallLoad]);

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthincome').then((response) => {
			setmonth_income(response.data[0].amTotal);
		});
	}, [smallLoad]);

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthexpense').then((response) => {
			setmonth_expense(response.data[0].amTotal);
		});
	}, [smallLoad]);

	const navigate = useNavigate();

	const navigateToAllTrans = () => {
		navigate('/alltransactions');
	};

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner handleChange={handleChange}/>);
	}
	return (
		<div className="App">
			<div className="bg"> </div>
			<Header />
			<div className="container">
				<div className="container1">
				{!monthmoney.length ? <div className="notrans"> </div> : <div className="income">
					<h2 className="record"> Income For This Month: ₹ {monthincome} </h2>
					<ChartsIncome smallLoad={smallLoad}/>
				</div>}
				<InsertEntries handleSmallLoad={handleSmallLoad}/>
				{!monthmoney.length ? <div className="notrans"> </div> : <div className="expense">
					<h2 className="record"> Expenses For This Month: ₹ {monthexpense} </h2>
					<ChartsExpense smallLoad={smallLoad}/>
				</div>}
			</div>
			</div>
			<div>
				<h1 className="head"> Transactions This Month </h1>
			</div>
			{!monthmoney.length ? <div> <h1 className='head'> No transactions found. </h1> </div> : 
				<div className="containertrans">
                    <div className="transactions">
						<DeleteUpdate handleSmallLoad={handleSmallLoad} money={monthmoney}/>
					</div>
				</div>}
			<div>
				{!monthmoney.length ? null : <button className="button" onClick={() => {
					genPDFSubmit((called) => !called);
					}}> Generate PDF </button>}
				{pdfcalled && <jsPdfGenerator money={monthmoney} genPDFSubmit={genPDFSubmit} />}
				<button className="button" onClick={navigateToAllTrans}> View All Transactions </button>
				<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
			</div>
		</div>
	);
}
export default CrudSpeechlyPDF;