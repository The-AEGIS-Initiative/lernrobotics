import React, { useEffect, useState, useContext } from 'react';
import useForm from '../hooks/useForm';
import { postData } from '../components/HttpController';
import { AppContext } from '../contexts/AppContext';

function RegisterCardContent ({onSuccess}) {
  const appContext = useContext(AppContext)
  const initialValues = {email:'', password:''}

  const { values, handleChange, handleSubmit } = useForm(initialValues, register);

  // POST email and password to backend for registration
  function register() {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/user/register`;
    postData(endpoint, values, (res)=>{
      if (res.status === 200) {
        console.log('Registered')
        onSuccess()
      } else { // If authentication fails
        const error = new Error(res.error);
        throw error;
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <br />
       <input type="submit" value="Register"/>
      </form>
    </div>
  );

}

export default RegisterCardContent;