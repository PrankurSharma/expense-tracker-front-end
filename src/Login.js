import React, { useState } from 'react';
import Axios from 'axios';


function Login() {
  Axios.defaults.withCredentials = true;
  const [person_id, setperson_id] = useState("");
  const [password, set_password] = useState("");

  const handleSubmit = () => {
      if(person_id && password){
          Axios.post('https://my-expense-tracker-project.herokuapp.com/api/login', {
              person_id: person_id,
              password: password
          }).then((response) => {
            if (!response.data.message && !response.data.error) {
                window.location.href = "/";
            }
            else {
                alert(response.data.message);
            }
            });
      }
      else{
        alert("Please fill both the fields in order to proceed.");
      }
  }

  return (
    <div className="login-form">
      <a href='/'>
        <img src="/logo.png" />
      </a>
      <div>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input type="text"
              name="ID"
              onChange={(e) => {
                setperson_id(e.target.value);
              }} placeholder="Personal ID" />
          </div>
          <div className="input-field">
            <input type="password"
              name="password"
              onChange={(e) => {
                set_password(e.target.value);
              }} placeholder="Password" />
          </div>
          <a href="/forgot" className="link">Forgot Your Password?</a>
        </div>
        <div className="action">
          <button className='button1' onClick={() => {
            window.location.href = "/signup";
          }}> Register an account </button>
          <button className='button1' onClick={() => {
            handleSubmit();
          }}> Sign in </button>
        </div>
      </div>
    </div>
  );
}

export default Login;