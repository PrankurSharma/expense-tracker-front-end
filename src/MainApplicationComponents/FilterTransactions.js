import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../Header';
import Spinner from '../Spinner';
import JSPDFGenerator from '../JSPDFGenerator';
import DeleteUpdate from '../InsertDeleteUpdateComponents/DeleteUpdate';
import FilterIncome from '../IncomeComponents/FilterIncome';
import FilterExpense from '../ExpenseComponents/FilterExpense';

function FilterTransactions() {
    const [month, set_month] = useState("");
    const [year, set_year] = useState("");
    const [money, set_money] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smallLoad, setSmallLoad] = useState(true);
    const [pdfcalled, setPdfCalled] = useState(false);
    const isMounted = useRef(false);
    Axios.defaults.withCredentials = true;
    
    function handleChange(newValue){
        setLoading(newValue);
    }

    function handleSmallLoad(newValue){
        setSmallLoad(newValue);
    }

    function genPDFSubmit(newValue) {
		setPdfCalled(newValue);
	}

    let minOffset = 0, maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    const yearList = allYears.map((x) => {return(<option key={x}>{x}</option>)});
    
    useEffect(() => {
        if(isMounted.current){
            if (month && year) {
                Axios.post('https://my-expense-tracker-project.herokuapp.com/api/filter', {
                    month: month,
                    year: year
                }).then((response) => {
                    set_money(response.data);
                });
            }
            else {
                alert("Please fill both the fields in order to proceed.");
            }
        }
        else{
            isMounted.current = true;
        }
    }, [smallLoad]);

    const navigate = useNavigate();

	const navigateToAllTrans = () => {
		navigate('/alltransactions');
	};

    if (loading) {
        return (<Spinner handleChange={handleChange}/>);
    }
    else {
        return (
            <div className='App'>
                <Header />
                <h1 className='head'> Filter Transactions </h1>
                <div>
                    <select id="month" name="month" onChange={(e) => {
                        set_month(e.target.value);
                    }}>
                        <option>month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select id="year" name="year" onChange={(e) => {
                        set_year(e.target.value);
                    }}>
                        {yearList}
                    </select>
                    <button className='button' onClick={() => {
                        handleSmallLoad((loading) => !loading);
                    }}> Filter Results </button>
                </div>
                <div className="filtertransactions">
                    <FilterIncome smallLoad={smallLoad} month={month} year={year} />
                    <FilterExpense smallLoad={smallLoad} month={month} year={year} />
                    <div>
                        <h1 className='head'> Transaction Results </h1>
                    </div>
                    {!money.length ? <div> <h1 className='head'> No transactions found. </h1> </div> : <div className='containertrans'>
                        <div className='alltransactions'>
                            <DeleteUpdate money={money} handleSmallLoad={handleSmallLoad}/>
                        </div>
                    </div>}
                </div>
                <div>
                    {!money.length ? null : <button className="button" onClick={() => {
                        genPDFSubmit((called) => !called);
                    }}> Generate PDF </button>}
                    {pdfcalled && <JSPDFGenerator money={money} genPDFSubmit={genPDFSubmit} />}
                    <button className='button' onClick={navigateToAllTrans}> View All Transactions </button>
                </div>
            </div>
        );
    }
}
export default FilterTransactions;