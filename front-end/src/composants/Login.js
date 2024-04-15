import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/csrf-token');
        const { csrfToken } = await response.json();
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    }
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle response
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="content">
      <div className="img">
        <img src={require('../images/logo.png')} alt="Login" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_token" value={csrfToken} /> {/* CSRF token */}
        <div className="field">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot-pass">
          <a href="#">Mot de passe oublié ?</a>
        </div>
        <button type="submit">Se connecter</button>
        <div className="signup-link">
          Pas encore inscrit ? <a href="#"> S'inscrire</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
