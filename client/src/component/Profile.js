import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_MY_PROFILE } from '../graphql/queries'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  let navigate = useNavigate();
  let {loading, error, data}= useQuery(GET_MY_PROFILE,{
    fetchPolicy: "network-only", 
  });
  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1>unauthorized</h1>
  }
  if(loading){
    return <h2>Loading Profile</h2>
  }
  if(error){
    console.log(error)
  }
  return (
    <div className='container my-container'>
        <div className='center-align'>
            <img className='circle' style={{border: "2px solid black", marginTop: "10px"}} src="https://robohash.org/{`data.user.firstName`}.png?size=200x200" alt='pic'></img>
            <h5>{data.user.firstName} {data.user.lastName}</h5>
            <h6>Email - {data.user.email}</h6>
        </div>
        <h3>Your Quotes</h3>
        {data.user.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  )
}
