import React, { useState, useEffect } from "react";
import Axios from "axios";
function Header() {
    const [user_id, setuser_id] = useState("");
	const [user_name, setuser_name] = useState("");
    Axios.defaults.withCredentials = true;
    useEffect(() => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/login').then((response) => {
			if (response.data[0].person_id && response.data[0].username) {
				setuser_id(response.data[0].person_id);
				setuser_name(response.data[0].username);
			}
			else {
				window.location.href = '/login';
			}
		})
	}, []);
    const logout = () => {
		Axios.get('https://my-expense-tracker-project.herokuapp.com/api/logout').then((response) => {
			alert("Please click OK to proceed logging out.");
			window.location.href = '/login';
		}).catch((err) => {
			alert(err);
		});
	}
    return (
        <div>
            <div>
            <a href="/">
                <img src='/logo.png' alt="Finer"/>
            </a>
            </div>
            <div className="divhead">
            <h1 className="head"> Hi User {user_name} </h1>
            <button className="button" onClick={() => {
                logout();
            }}> Logout </button>
            </div>
        </div>
    );
}
export default Header;