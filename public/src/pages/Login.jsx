import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Await, Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.jpg";
import "../Register.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const registros = {
        username: values.username,
        email: values.email,
        password: values.password
      }
      try {
        const response = await fetch(
          "http://localhost:5000/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registros),
          }
        );
        
        if (!response.ok) {
          switch (response.status) {
            case 400:
              const resultado = await response.json();
              toast(resultado);
              break;
            default:
              toast("Error desconocido")
              break;
          }
        } else {
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(response.json()));
          navigate("/");
        }
      } catch (error) {
      }
      //----------------------------------------------------------------
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 7) {
      toast.error(
        "Minimo 7 caracteres para el nombre"
      );
      return false;
    }
    else if (password.length < 7) {
      toast.error(
        "Minimo 7 caracteres para la contraseña"
      );
      return false;
    }
    return true;
  };
  return (
    <div className="FormContainer">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <img src={logo} alt="logo" />
          <h1>Oso</h1>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
        <input type="password" placeholder='password' name='password' onChange={(e) => handleChange(e)} />
        <button type='submit' >Login</button>
        <span>¿No tienes una cuenta?<Link to="/Register">Register</Link></span>
      </form>
    </div>
  )
}



export default Login