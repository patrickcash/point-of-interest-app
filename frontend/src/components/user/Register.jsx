import React, {useRef, useState} from 'react'
import "./register.css"

import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";

export default function Register(props) {
    const {setShowRegister} = props;
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
  
      try {
        await axios.post("/users/register", newUser);
        setError(false);
        setSuccess(true);
      } catch (err) {
        setError(true);
      }
    };

    return (
      <div className="registerPopup">
        <div className="logo">
          <Room className="logoIcon" />
          <span>POI</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder="username" ref={usernameRef} />
          <input type="email" placeholder="email" ref={emailRef} />
          <input
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
          {success && (
            <span className="success">New User Registered</span>
          )}
          {error && <span className="failure">Failed to register new user</span>}
        </form>
        <Cancel
          className="registerCancel"
          onClick={() => setShowRegister(false)}
        />
      </div>
    );
}
