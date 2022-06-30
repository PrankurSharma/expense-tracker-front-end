import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';
import Spinner from "./Spinner";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function AllTransactions() {
	const [money, set_money] = useState([]);
	const [new_amount, setnew_amount] = useState("");
	const [new_task, setnew_task] = useState("");
	const [totalincome, settotal_income] = useState("");
	const [totalexpense, settotal_expense] = useState("");
	const [loading, setLoading] = useState(true);

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
			setLoading((loading) => !loading);
		}).catch((err) => {
			alert(err);
		});
	}, []);

	const totalTrans = () => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/get').then((response) => {
			set_money(response.data);
			setLoading((loading) => !loading);
		}).catch((err) => {
			alert(err);
		});
	};

	const totalIncome = () => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalincome').then((response) => {
			settotal_income(response.data[0].amTotal);
		}).catch((err) => {
			alert(err);
		});
	};

	const totalExpense = () => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/gettotalexpense').then((response) => {
			settotal_expense(response.data[0].amTotal);
		}).catch((err) => {
			alert(err);
		});
	};

	const deleteTransaction = (trans_id) => {
		Axios.delete(`https://my-expense-tracker-project.herokuapp.com/api/delete/${trans_id}`).catch((err) => {
			alert(err.response);
		}).catch((err) => {
			alert(err);
		});
		setLoading((loading) => !loading);
		alert("Transaction deleted successfully.");
		totalTrans();
		totalIncome();
		totalExpense();
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
			setLoading((loading) => !loading);
			totalTrans();
			totalIncome();
			totalExpense();
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

	const navigate = useNavigate();

	const navigateToFilterTrans = () => {
		navigate('/filtertransactions');
	}

	if (loading) {
		return (<Spinner />);
	}
	else {
		return (
			<div className='App'>
				<Header />
				<h1 className='head'> All Transactions </h1>
				<h1 className="record"> Income: ₹ {totalincome} </h1>
				<h1 className="record"> Expenses: ₹ {totalexpense} </h1>
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
					{!money.length ? null : <button className="button" onClick={jsPdfGenerator}> Generate PDF For All Transactions </button>}
					<button className='button' onClick={navigateToFilterTrans}> Filter Transactions By Month And Year </button>
				</div>
			</div>
		);
	}
}
export default AllTransactions;