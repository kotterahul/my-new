import React, { useState } from 'react';
import axios from 'axios';
import CountdownTimer from './CountdownTimer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0); // New state variable

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setUsername('');
        setPassword('');
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
        setIsLoggedIn(true);
        toast.success('Login Successful');
        const redirectURL = response.data.redirect_url;
        setTimeout(() => {
          window.location.href = redirectURL;
        }, 1900);
        setFailedAttempts(0);
      }
    } catch (error) {
      setUsername('');
      setPassword('');
      setFailedAttempts(prevAttempts => prevAttempts + 1);
      if (failedAttempts >= 2) { 
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 30000);
      }
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="login-box">
      <h2 className="log">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" className="form-input" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" className="form-input" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="button-container">
          <input type="submit" value="Login" disabled={isDisabled} />
        </div>
      </form>
      {isDisabled && <CountdownTimer initialSeconds={30} />}
    </div>
  );
};

export default Login;
