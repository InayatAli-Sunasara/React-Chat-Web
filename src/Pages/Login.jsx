import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Web</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" name="" id="" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {err && <span>Something went Wrong</span>}
          <button>Sign In</button>
        </form>
        <p>
          Do you want to create an Account?
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
