import React, { useState, useEffect } from "react";
import axios from 'axios';
import httpClient from "./httpClient";

import { User } from "./components/user_interface";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User| null>(null);

  const logoutUser = async () => {
    await httpClient.post('http://localhost:5000/logout');
    window.location.href = '/';
  };

  useEffect(() => {
    (async () => {
      try {
        const userId = sessionStorage.getItem('user_id');

        const resp = await httpClient.get('http://localhost:5000/users/'+ userId);
        setUser(resp.data);
      } catch (error) {
      

      }
    })();
  }, []);

  return (
    <div>
      <h1>Welcome to this React Application</h1>
      {user != null ? (
        <div>
          
               

          <h3>ID: {user.user_Id}</h3>
          <h3>Name: {user.firstName}</h3>
          <h3>Surname: {user.lastName}</h3>
          <h3>Email: {user.email}</h3>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <div>
            <a href="/inicio">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
