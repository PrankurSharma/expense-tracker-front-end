import React from "react";
import './App.css';
import CrudSpeechlyPDF from "./CrudSpeechlyPDF";
import Login from './Login';
import Signup from './Signup';
import Forgot from './Forgot';
import AllTransactions from './AllTransactions';
import FilterTransactions from './FilterTransactions';
import Header from "./Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
	return (
			<BrowserRouter>
				<Routes>
					<div className="App">
						<Header />
					</div>
					<Route exact path="/" element={<CrudSpeechlyPDF />} />
					<Route exact path="/alltransactions" element={<AllTransactions />} />
					<Route exact path="/filtertransactions" element={<FilterTransactions />} />
					</Routes>
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/forgot" element={<Forgot />} />
				</Routes>
			</BrowserRouter>
	);
}
export default App;