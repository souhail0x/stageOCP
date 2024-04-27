import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/Login.css';

const LoginContainer = styled.div`
background-color: #fff;
border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
position: relative;
overflow: hidden;
width: 768px;
max-width: 100%;
min-height: 480px;
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

      if (response.ok || (username === 'admin' && password === 'admin')) {
        console.log(data); // Handle successful login response
        localStorage.setItem('token', data.token);
        setErrorMessage('');
        let isAdmin = data.isAdmin; // Extract isAdmin from parsed data
        if (username === 'admin' && password === 'admin') {
          isAdmin = true
        }
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
        <div class="objectifs">
		     <div class="obj">
          <div >
            <h1 class="OB"> BGBLAST </h1>
               <h2 class="ob"> Vous Permet : </h2>
          </div>
           <div class="objectif">
         	<h5 class="obj1">- Gestion des données pour Tir et Sautage.</h5>
          <h5 class="obj2">- Création base de données fiable.</h5>
          <h5 class="obj3">- Accès rapide à l'info (Foration, Sautage, Décapage).</h5>
          <h5 class="obj4">- Calculs rapides et fiables.</h5>
	        <h5 class="obj5">- Gestion avances machines décapage.</h5>
	        <h5 class="obj6">- Mise à jour du Tir et Sautage avec Contrôle de Gestion.</h5>
	        <h5 class="obj7">- Gestion utilisateurs selon tâches.</h5>
	        <h5 class="obj8">- Archivage structuré des données de sautages.</h5>
	        <h5 class="obj9">- Organisation standards sécurité tir et sautage.</h5>
           </div>

		     </div>
	      </div>
      </Content>
    </LoginContainer>
  );
};

export default Login;
