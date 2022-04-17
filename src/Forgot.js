import React, { useState } from 'react';
import Axios from 'axios';

function Forgot() {

  const [person_id, setperson_id] = useState("");
  const [newpassword, setnew_password] = useState("");

  const handleSubmit = () => {
    if (person_id && newpassword) {
      Axios.put('https://my-expense-tracker-project.herokuapp.com/api/forgot', {
        person_id: person_id,
        newpassword: newpassword
      }).then((response) => {
        if (!response.data.message) {
          alert("Password updated successfully.");
          window.location.href = "/login";
        }
        else {
          alert(response.data.message);
        }
      }).catch((err) => {
        alert(err);
      });
    }
    else {
      alert("Please fill both the fields in order to proceed.");
    }
    setperson_id("");
    setnew_password("");
  }

  return (
    <div className="login-form">
      <a href='/'>
        <img src="/logo.png" />
      </a>
      <div>
        <h1> Forgot Password </h1>
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
                setnew_password(e.target.value);
              }} placeholder="New Password" />
          </div>
        </div>
        <div className="action">
          <button className='button' onClick={() => {
            handleSubmit();
          }}> Submit </button>
        </div>
      </div>
    </div>
  );
}

export default Forgot;