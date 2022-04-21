import React, { useState, useEffect } from "react";
import Axios from "axios";
import ChartsIncome from './ChartsIncome';
import ChartsExpense from './ChartsExpense';
import Header from './Header';
import { PushToTalkButton, BigTranscript, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function CrudSpeechlyPDF() {

	const [amount, set_amount] = useState("");
	const [task, set_task] = useState("");
	const [type, set_type] = useState("");
	const [date, set_date] = useState("");
	const [monthincome, setmonth_income] = useState("");
	const [monthexpense, setmonth_expense] = useState("");
	const [monthmoney, setmonth_money] = useState([]);
	const [new_amount, setnew_amount] = useState("");
	const [new_task, setnew_task] = useState("");
	const { segment } = useSpeechContext();
	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthtrans').then((response) => {
			setmonth_money(response.data);
		});
	}, []);

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthincome').then((response) => {
			setmonth_income(response.data[0].amTotal);
		});
	});

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/getmonthexpense').then((response) => {
			setmonth_expense(response.data[0].amTotal);
		});
	});

	function refreshPage() {
		window.location.reload(false);
	}

	const submitEntries = () => {
		if (amount && task && type && (type === "Income" || type === "Expense" || type === "INCOME" || type === "EXPENSE" || type === "income" || type === "expense")) {
			Axios.post('https://my-expense-tracker-project.herokuapp.com/api/insert', {
				amount: amount,
				task: task,
				type: type,
				date: date
			}).then(() => {
				alert("Successful insert");
			}).catch((err) => {
				alert(err);
			});
			alert("Record inserted successfully.");
			refreshPage();
		}
		else if (type !== "Income" && type !== "Expense" && type !== "INCOME" && type !== "EXPENSE" && type !== "income" && type !== "expense") {
			alert("Type of transaction can either be Income or Expense.");
		}
		else {
			alert("Please fill all the details in order to proceed.");
		}
	};

	const deleteTransaction = (trans_id) => {
		Axios.delete(`https://my-expense-tracker-project.herokuapp.com/api/delete/${trans_id}`).catch((err) => {
			alert(err);
		});
		refreshPage();
		alert("Transaction deleted successfully.");
	};

	const updateTransaction = (trans_id) => {
		if (new_amount && new_task) {
			Axios.put('https://my-expense-tracker-project.herokuapp.com/api/update', {
				trans_id: trans_id,
				amount: new_amount,
				task: new_task
			}).catch((err) => {
				alert(err);
			});
			refreshPage();
			alert("Transaction updated successfully.")
		}
		else {
			alert("Please fill both the values in order to update the transaction.");
		}
		setnew_amount("");
		setnew_task("");
	};

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

			if (segment.isFinal && amount && task && type) {
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

	return (
		<div className="App">
			<div className="bg"> </div>
			<Header />
			<div className="container">
				<div className="income">
					<h2 className="record"> Income For This Month: ₹ {monthincome} </h2>
					<ChartsIncome />
				</div>
				<div className="form">
					<h2 className="record"> Record Transaction </h2>
					<label className="label"> Amount: </label>
					<input
						type="text"
						name="amount"
						onChange={(e) => {
							set_amount(e.target.value);
						}}
					/>
					<label className="label"> Task: </label>
					<input
						type="text"
						name="task"
						onChange={(e) => {
							set_task(e.target.value);
						}}
					/>
					<label className="label"> Type: </label>
					<select
						id="type"
						type="text"
						name="type"
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
				<div className="expense">
					<h2 className="record"> Expenses For This Month: ₹ {monthexpense} </h2>
					<ChartsExpense />
				</div>
			</div>
			<div>
				<h1 className="head"> Transactions This Month </h1>
			</div>
			<div className="containertrans">
				<div className="transactions">
					{monthmoney.map((val) => {
						return (
							<div className="card">
								<h1 className="heading"> {val.Task} </h1>
								<h2 className="heading"> ID: {val.trans_id} </h2>
								<h3 className="heading"> Amount: ₹ {val.Amount} <span> Type: {val.Type} </span> </h3>
								<h4 className="heading"> Date: {val.added_date} </h4>
								<button className="delete" onClick={() => {
									deleteTransaction(val.trans_id);
								}}> Delete </button>
								<div className="smallcard">
									<h4 className="heading"> New Task: <input type="text" id="updateInput" onChange={(e) => {
										setnew_task(e.target.value)
									}} />
										New Amount: <input type="text" id="updateInput1" onChange={(e) => {
											setnew_amount(e.target.value)
										}} />
									</h4>
									<button className="update" onClick={() => {
										updateTransaction(val.trans_id);
									}}> Update </button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<button className="button" disabled={!monthmoney.length} onClick={jsPdfGenerator}> Generate PDF </button>
				<button className="button" onClick={() => {
					window.location.href = "/alltransactions";
				}}> View All Transactions </button>
				<button className='button' onClick={() => {
					window.location.href = "/filtertransactions";
				}}> Filter Transactions By Month And Year </button>
			</div>
		</div>
	);
}
export default CrudSpeechlyPDF;