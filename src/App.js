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
			</Routes>
			<Routes>
				<Route exact path="/login" element={<Login />} />
			</Routes>
			<Routes>
				<Route exact path="/signup" element={<Signup />} />
			</Routes>
			<Routes>
				<Route exact path="/forgot" element={<Forgot />} />
			</Routes>
			<Routes>
				<Route exact path="/alltransactions" element={<AllTransactions />} />
			</Routes>
			<Routes>
				<Route exact path="/filtertransactions" element={<FilterTransactions />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;