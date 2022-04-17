import React, { useState } from 'react';
import uuid from 'react-uuid';
import Axios from 'axios';


function Signup() {
  Axios.defaults.withCredentials = true;
  const [username, setuser_name] = useState("");
  const [password, set_password] = useState("");
  const person_id = uuid().slice(0, 7);
  const handleSubmit = async () => {
    if (username && password) {
        Axios.post('https://my-expense-tracker-project.herokuapp.com/api/signup', {
          person_id: person_id,
          username: username,
          password: password
        }).catch((err) => {
          alert(err);
        });
          alert("Your personal id is: " + person_id + ". Please keep it safely as it will be used for all the future logins.");
          window.location.href = "/login";
    }
    else {
      alert("Please fill both the fields in order to proceed.");
    }
  }

  return (
    <div className="login-form">
      <a href='/'>
        <img src="/logo.png" />
      </a>
      <div>
        <h1> Signup </h1>
        <div className="content">
          <div className="input-field">
            <input type="text"
              name="username"
              onChange={(e) => {
                setuser_name(e.target.value);
              }} placeholder="Username(Can be your name or email)" />
          </div>
          <div className="input-field">
            <input type="password"
              name="password"
              onChange={(e) => {
                set_password(e.target.value);
              }} placeholder="Password" />
          </div>
        </div>
        <div className="action">
          <button onClick={() => {
            window.location.href = "/login";
          }}> Already signed up? Login </button>
          <button onClick={() => {
            handleSubmit();
          }}> Register </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;