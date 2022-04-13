import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Forgot from './Forgot';
import AllTransactions from './AllTransactions';
import FilterTransactions from './FilterTransactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SpeechProvider } from '@speechly/react-client';
ReactDOM.render(
    <SpeechProvider appId="85f4a8c7-b6b1-418d-87a9-60f62c5705ba" language="en-US">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Routes>
                <Route path="/forgot" element={<Forgot />} />
            </Routes>
            <Routes>
                <Route path="/alltransactions" element={<AllTransactions />} />
            </Routes>
            <Routes>
                <Route path="/filtertransactions" element={<FilterTransactions />} />
            </Routes>
        </BrowserRouter>
    </SpeechProvider>
    , document.getElementById('root'));


