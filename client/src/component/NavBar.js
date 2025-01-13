import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

export default function NavBar() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const client = useApolloClient();
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token
    client.clearStore();  // Clear Apollo Client's cache
    navigate('/login');  // Redirect to login page
  };
  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo ">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right">
          {token ? 
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li><button className="red btn" onClick={handleLogout}>Logout</button></li>
            </>
           : 
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
}
