import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import CommandPage from './CommandPage';
import SautagePage from './SautagePage';
import GestionStock from './GestionStock';
import GestionCout from './GestionCout';
import EtatChantier from './EtatChantier';
import Dashboard from './Dashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const closeBtn = document.querySelector("#btn");
    if (isSidebarOpen) {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    } else {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    }
  };

  return (
    <Router>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon"></i>
          <div className="logo_name">Tir et Sautage</div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Home</span>
            </Link>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <Link to="/command">
              <i className="bx bx-user"></i>
              <span className="links_name">Saisir commande</span>
            </Link>
            <span className="tooltip">Saisir commande</span>
          </li>
          {/* Répétez cela pour chaque lien */}
        </ul>
      </div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/command" component={CommandPage} />
        <Route path="/sautage" component={SautagePage} />
        <Route path="/gestion-stock" component={GestionStock} />
        <Route path="/gestion-cout" component={GestionCout} />
        <Route path="/etat-chantier" component={EtatChantier} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
