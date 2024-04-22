import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/Login.css';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  background: #f5f5f5;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Increased container width */
  width: 100%;
`;

const Img = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 150px;
    
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .field {
    position: relative;
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px 20px;
      border: none;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      outline: none;
      padding-left: 35px; /* Added padding left for space */
      
      &:focus {
        border-color: #007bff;
      }
    }

    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      color: #555;
    }
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }

  button {
    background: #5eb116;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #4a8418;
    }
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json(); // Parse JSON response once

      if (response.ok) {
        console.log(data); // Handle successful login response
        localStorage.setItem('token', data.token);
        setErrorMessage('');
        const isAdmin = data.isAdmin; // Extract isAdmin from parsed data
        onLogin(isAdmin);
      } else {
        console.error('Error:', data.message); // Handle login error response
        if (data.message === 'Invalid credentials') {
          setErrorMessage('Email ou mot de passe incorrect');
        } else {
          setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
        }

      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.'); // Generic error message
    }
  };


  return (
    <LoginContainer>
      <Content>
        <Img>
          <img src={require('../images/BGblast-removebg-preview.png')} alt="Login" />
        </Img>
        <Form onSubmit={handleSubmit}>
          <div className="field">
            <i class='bx bxs-user'></i>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <i className="bx bxs-lock"></i>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <button type="submit">Se connecter</button>
        </Form>
      </Content>
    </LoginContainer>
  );
};

export default Login;
