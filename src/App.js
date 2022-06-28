import React, { useState, useEffect } from "react";
import './App.css';
import CrudSpeechlyPDF from "./CrudSpeechlyPDF";
import Login from './Login';
import Signup from './Signup';
import Forgot from './Forgot';
import AllTransactions from './AllTransactions';
import FilterTransactions from './FilterTransactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<CrudSpeechlyPDF />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/forgot" element={<Forgot />} />
				<Route exact path="/alltransactions" element={<AllTransactions />} />
				<Route exact path="/filtertransactions" element={<FilterTransactions />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;