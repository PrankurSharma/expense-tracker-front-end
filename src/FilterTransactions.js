import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';
import Spinner from './Spinner';
import jsPdfGenerator from './JSPDFGenerator';
import DeleteUpdate from './DeleteUpdate';

function FilterTransactions() {
    const [month, set_month] = useState("");
    const [year, set_year] = useState("");
    const [money, set_money] = useState([]);
    const [filter_income, setfilter_income] = useState("");
    const [filter_expense, setfilter_expense] = useState("");
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

    const filterEntries = () => {
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

    const filterIncome = () => {
        if (month && year) {
            Axios.post('https://my-expense-tracker-project.herokuapp.com/api/filterincome', {
                month: month,
                year: year
            }).then((response) => {
                setfilter_income(response.data[0].amTotal);
            });
        }
    }

    const filterExpense = () => {
        if (month && year) {
            Axios.post('https://my-expense-tracker-project.herokuapp.com/api/filterexpense', {
                month: month,
                year: year
            }).then((response) => {
                setfilter_expense(response.data[0].amTotal);
            });
        }
    }

    function filter() {
        filterEntries();
        filterIncome();
        filterExpense();
    }
    
    useEffect(() => {
        if(isMounted.current){
            filter();
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
        return (<Spinner onChange={handleChange}/>);
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
                        <option>year</option>
                        <option value="1940">1940</option>
                        <option value="1941">1941</option>
                        <option value="1942">1942</option>
                        <option value="1943">1943</option>
                        <option value="1944">1944</option>
                        <option value="1945">1945</option>
                        <option value="1946">1946</option>
                        <option value="1947">1947</option>
                        <option value="1948">1948</option>
                        <option value="1949">1949</option>
                        <option value="1950">1950</option>
                        <option value="1951">1951</option>
                        <option value="1952">1952</option>
                        <option value="1953">1953</option>
                        <option value="1954">1954</option>
                        <option value="1955">1955</option>
                        <option value="1956">1956</option>
                        <option value="1957">1957</option>
                        <option value="1958">1958</option>
                        <option value="1959">1959</option>
                        <option value="1960">1960</option>
                        <option value="1961">1961</option>
                        <option value="1962">1962</option>
                        <option value="1963">1963</option>
                        <option value="1964">1964</option>
                        <option value="1965">1965</option>
                        <option value="1966">1966</option>
                        <option value="1967">1967</option>
                        <option value="1968">1968</option>
                        <option value="1969">1969</option>
                        <option value="1970">1970</option>
                        <option value="1971">1971</option>
                        <option value="1972">1972</option>
                        <option value="1973">1973</option>
                        <option value="1974">1974</option>
                        <option value="1975">1975</option>
                        <option value="1976">1976</option>
                        <option value="1977">1977</option>
                        <option value="1978">1978</option>
                        <option value="1979">1979</option>
                        <option value="1980">1980</option>
                        <option value="1981">1981</option>
                        <option value="1982">1982</option>
                        <option value="1983">1983</option>
                        <option value="1984">1984</option>
                        <option value="1985">1985</option>
                        <option value="1986">1986</option>
                        <option value="1987">1987</option>
                        <option value="1988">1988</option>
                        <option value="1989">1989</option>
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    <button className='button' onClick={() => {
                        handleSmallLoad((loading) => !loading);
                    }}> Filter Results </button>
                </div>
                <div className="filtertransactions">
                    <h1 className='heading'> Income for the chosen month: ₹ {filter_income} </h1>
                    <h1 className='heading'> Expenses for the chosen month: ₹ {filter_expense} </h1>
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
                    {pdfcalled && <jsPdfGenerator money={money} genPDFSubmit={genPDFSubmit} />}
                    <button className='button' onClick={navigateToAllTrans}> View All Transactions </button>
                </div>
            </div>
        );
    }
}
export default FilterTransactions;