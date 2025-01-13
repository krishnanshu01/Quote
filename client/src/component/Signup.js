import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP } from "../graphql/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signup,{loading, data, error}] = useMutation(SIGNUP);
  if(loading) return <h1>Loading</h1>
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    signup({
      variables:{
        userNew: formData
      }
    })
  };
  return (
    <div className="container my-container">

    {
      error && <div className="red card-panel">{error.message}</div>
    }
    {
      data && data.user && <div className="green card-panel">{data.user.firstName}is SignedUp. You can Login now!</div>
    }
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
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

        <Link to ="/login"><p>Already have an account? Click here</p></Link>
        <button className="btn #7e57c2 deep-purple" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
