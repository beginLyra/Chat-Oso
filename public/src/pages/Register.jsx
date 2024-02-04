import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Await, Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.jpg";
import "../Register.css";
import { toast } from 'react-toastify';


import { registerRoute } from '../utils/APIRoutes';


function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = async (event) => {

    event.preventDefault();
    if (handleValidation()) {

      const { username, email, password } = values;



      const registros = {
        username: username,
        email: email,
        password: password


      }

      try {

        const response = await fetch(
          "http://localhost:5000/agregarUsuarios",
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
              toast("Este usuario ya existe")
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

        console.error("Error al realizar la solicitud:", error);
      }

      //----------------------------------------------------------------





    }




  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

  };



  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;


    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same."
      );

      return false;
    } else if (username.length < 7) {
      toast.error(
        "Minimo 7 caracteres para el nombre"
      );
      return false;
    }
    else if (password.length < 7) {
      toast.error(
        "Minimo 7 caracteres para la coontraseña"
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
        <input type="email" placeholder='email' name='email' onChange={(e) => handleChange(e)} />
        <input type="password" placeholder='password' name='password' onChange={(e) => handleChange(e)} />
        <input type="password" placeholder='confirm password' name='confirmPassword' onChange={(e) => handleChange(e)} />
        <button type='submit' >Create user</button>
        <span> Ya tienes una cuenta ?<Link to="/Login">Login</Link></span>

      </form>

    </div>

  )
}



export default Register