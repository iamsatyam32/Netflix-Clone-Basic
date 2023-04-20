import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterCompound from "../../compounds/FooterCompound";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {}
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="register">
        <div className="top">
          <div className="wrapper">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
            <button className="loginButton" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {!email ? (
            <div className="input">
              <input type="email" placeholder="email address" ref={emailRef} />
              <button className="registerButton" onClick={handleStart}>
                Get Started
              </button>
            </div>
          ) : (
            <form className="input">
              <input type="username" placeholder="username" ref={usernameRef} />
              <input type="password" placeholder="password" ref={passwordRef} />
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
          )}
          <br />
          <div className="have-account">
            <p>
              Already have an account? <b onClick={handleSignIn}>Sign in</b>
            </p>
          </div>
        </div>
      </div>
      <div className="footer" style={{ backgroundColor: "black" }}>
        <FooterCompound />
      </div>
    </div>
  );
}

//useHistory is replace by useNavigate in v6.
