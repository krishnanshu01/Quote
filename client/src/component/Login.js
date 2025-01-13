import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";

export default function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [userLogin, {error, loading, data}] = useMutation(LOGIN, {
    onCompleted(data){
      localStorage.setItem("token", data.user.token);
      navigate('/');
    }
  })
  if(loading){
    return <h1>Loading</h1>
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({
      variables: {
        userSignin: formData
      }
    })
  };
  return (
    <div className="container my-container">
    {
      error && <div className="red card-panel">{error.message}</div>
    }
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
        
        <Link to="/signup"><p>Don'nt have account? Click here</p></Link>
        <button className="btn #7e57c2 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
