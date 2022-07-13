import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PushToTalkButton, BigTranscript, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';

function InsertEntries({handleSmallLoad}) {

    const [amount, set_amount] = useState("");
	const [task, set_task] = useState("");
	const [type, set_type] = useState("");
	const [date, set_date] = useState("");
    const { segment } = useSpeechContext();

    const submitEntries = () => {
		if (amount && task && type && date && (type === "Income" || type === "Expense" || type === "INCOME" || type === "EXPENSE" || type === "income" || type === "expense")) {
			Axios.post('https://my-expense-tracker-project.herokuapp.com/api/insert', {
				amount: amount,
				task: task,
				type: type,
				date: date
			});
			alert("Record inserted successfully.");
			handleSmallLoad((loading) => !loading);
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

    return (
        <>
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
        </>
    );
}
export default InsertEntries;