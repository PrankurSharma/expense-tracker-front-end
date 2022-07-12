import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ChartsIncome from './ChartsIncome';
import ChartsExpense from './ChartsExpense';
import Header from './Header';
import Spinner from "./Spinner";
import DeleteUpdate from "./DeleteUpdate";
import { PushToTalkButton, BigTranscript, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function CrudSpeechlyPDF(props) {

	const [amount, set_amount] = useState("");
	const [task, set_task] = useState("");
	const [type, set_type] = useState("");
	const [date, set_date] = useState("");
	const [monthincome, setmonth_income] = useState("");
	const [monthexpense, setmonth_expense] = useState("");
	const [monthmoney, setmonth_money] = useState([]);
	const { segment } = useSpeechContext();
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

	const submitEntries = () => {
		if (amount && task && type && date && (type === "Income" || type === "Expense" || type === "INCOME" || type === "EXPENSE" || type === "income" || type === "expense")) {
			Axios.post('https://my-expense-tracker-project.herokuapp.com/api/insert', {
				amount: amount,
				task: task,
				type: type,
				date: date
			});
			alert("Record inserted successfully.");
			setSmallLoad((loading) => !loading);
			set_amount("");
			set_task("");
			set_type("");
			set_date("");
		}
		else if (type !== "Income" && type !== "Expense" && type !== "INCOME" && type !== "EXPENSE" && type !== "income" && type !== "expense") {
			alert("Type of transaction can either be Income or Expense.");
		}
		else {
			alert("Please fill all the details in order to proceed.");
		}
	};

	/*const deleteTransaction = (trans_id) => {
		Axios.delete(`https://my-expense-tracker-project.herokuapp.com/api/delete/${trans_id}`);
		alert("Transaction deleted successfully.");
		setSmallLoad((loading) => !loading);
	};

	const updateTransaction = (trans_id) => {
		if (new_amount && new_task) {
			Axios.put('https://my-expense-tracker-project.herokuapp.com/api/update', {
				trans_id: trans_id,
				amount: new_amount,
				task: new_task
			});
			alert("Transaction updated successfully.");
			setSmallLoad((loading) => !loading);
		}
		else {
			alert("Please fill both the values in order to update the transaction.");
		}
		setnew_amount("");
		setnew_task("");
	};*/

	useEffect(() => {
		if (segment) {
			segment.entities.forEach((s) => {
				switch (s.type) {
					case 'amount':
						set_amount(s.value);
						break;
					case 'task':
						set_task(s.value);
						break;
					case 'type':
						set_type(s.value);
						break;
					case 'date':
						set_date(s.value);
						break;
					default:
						break;
				}
			});

			if (segment.isFinal && amount && task && type && date) {
				submitEntries();
			}
		}
	}, [segment]);

	function jsPdfGenerator() {
		var doc = new jsPDF();
		var cols = ["Trans_id", "Task", "Amount", "Type", "Date"];
		var rows = [];
		monthmoney.forEach(element => {
			var temp = [element.trans_id, element.Task, element.Amount, element.Type, element.added_date];
			rows.push(temp);
		});
		doc.autoTable(cols, rows, { startY: 10 });
		doc.save("transactions.pdf");
	}

	const navigate = useNavigate();

	const navigateToAllTrans = () => {
		navigate('/alltransactions');
	};

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner onChange={handleChange}/>);
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
				<div className="form">
					<h2 className="record"> Record Transaction </h2>
					<label className="label"> Amount: </label>
					<input
						type="text"
						name="amount"
						value={amount}
						onChange={(e) => {
							set_amount(e.target.value);
						}}
					/>
					<label className="label"> Task: </label>
					<input
						type="text"
						name="task"
						value={task}
						onChange={(e) => {
							set_task(e.target.value);
						}}
					/>
					<label className="label"> Type: </label>
					<select
						id="type"
						type="text"
						name="type"
						value={type}
						onChange={(e) => {
							set_type(e.target.value);
						}}>
						<option> Type </option>
						<option> Income </option>
						<option> Expense </option>
					</select>
					<label className="label"> Date: </label>
					<input id="date"
						type="date"
						name="date"
						value={date}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => {
							set_date(e.target.value);
						}} />
					<button className="button" onClick={() => {
						submitEntries();
					}}> Submit </button>
					<div>
						<h5 className="head1"> OR Hold the button and Try Saying: Add amount of 50 rupees for task Shopping of type Expense for Today. </h5>
					</div>
					<PushToTalkButton className="pushbutton" captureKey=" " />
				</div>
				<BigTranscript placement="top" />
				<ErrorPanel placement="bottom" />
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
						<DeleteUpdate money={monthmoney} onSmallLoad={handleSmallLoad}/>
					</div>
				</div>
			}
			<div>
				{!monthmoney.length ? null : <button className="button" onClick={jsPdfGenerator}> Generate PDF </button>}
				<button className="button" onClick={navigateToAllTrans}> View All Transactions </button>
				<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
			</div>
		</div>
	);
}
export default CrudSpeechlyPDF;