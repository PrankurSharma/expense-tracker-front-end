import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from './Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function AllTransactions() {
	const [money, set_money] = useState([]);
	const [new_amount, setnew_amount] = useState("");
	const [new_task, setnew_task] = useState("");
	const [totalincome, settotal_income] = useState("");
	const [totalexpense, settotal_expense] = useState("");
	Axios.defaults.withCredentials = true;

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalincome').then((response) => {
			settotal_income(response.data[0].amTotal);
		}).catch((err) => {
			alert(err);
		});
	});

	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalexpense').then((response) => {
			settotal_expense(response.data[0].amTotal);
		}).catch((err) => {
			alert(err);
		});
	});


	useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/get').then((response) => {
			set_money(response.data);
		}).catch((err) => {
			alert(err);
		});
	}, []);

	function refreshPage() {
		window.location.reload(false);
	}

	const deleteTransaction = (trans_id) => {
		Axios.delete(`https://my-expense-tracker-project.herokuapp.com/api/delete/${trans_id}`).catch((err) => {
			alert(err.response);
		}).catch((err) => {
			alert(err);
		});
		alert("Transaction deleted successfully");
		refreshPage();
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
			alert("Transaction updated successfully.");
			refreshPage();
		}
		else {
			alert("Please fill both the values in order to update the transaction.");
		}
		setnew_amount("");
		setnew_task("");
	};

	function jsPdfGenerator() {
		var doc = new jsPDF();
		var cols = ["Trans_id", "Task", "Amount", "Type", "Date"];
		var rows = [];
		money.forEach(element => {
			var temp = [element.trans_id, element.Task, element.Amount, element.Type, element.added_date];
			rows.push(temp);
		});
		doc.autoTable(cols, rows, { startY: 10 });
		doc.save("transactions.pdf");
	}

	return (
		<div className='App'>
			<Header />
			<h1 className='head'> All Transactions </h1>
			<h1 className="record"> Income: ₹ {totalincome} </h1>
			<h1 className="record"> Expenses: ₹ {totalexpense} </h1>
			<button className='button' onClick={() => {
				window.location.href = "/filtertransactions";
			}}> Filter Transactions By Month And Year </button>
			<div className="containertrans">
				<div className="alltransactions">
					{money.map((val) => {
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
				<button className="button" disabled={!money.length} onClick={jsPdfGenerator}> Generate PDF for all transactions </button>
			</div>
		</div>
	);
}
export default AllTransactions;