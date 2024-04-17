import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link à partir de 'react-router-dom'
import '../styles/Sidebare.css';

function SidBar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);

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
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="logo-details">
        {/* <i className="bx bxl-c-plus-plus icon"></i> */}
        <center><div className="logo_name">Tir et Sautage</div></center>
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
        {
          !isAdmin ? '' : (
            <>
              <li>
                <Link to="/command">
                  <i className="bx bx-edit"></i>
                  <span className="links_name">Saisir commande</span>
                </Link>
                <span className="tooltip">Saisir commande</span>
              </li>
              <li>


                {/* // Assuming you have a state variable called `isDisabled` */}
                <Link to="/sautage">
                  <i className="bx bx-wrench"></i>
                  <span className="links_name">Sairir-a-sautage</span>
                </Link>

                <span className="tooltip">Sairir-a-sautage</span>
              </li>
              <li>
                <Link to="/gestion-stock">
                  <i className="bx bx-box"></i>
                  <span className="links_name">Gestion-stock</span>
                </Link>
                <span className="tooltip">Gestion-stock</span>
              </li>
              <li>
                <Link to="/gestion-cout">
                  <i className="bx bx-money"></i>
                  <span className="links_name">Gestion-cout</span>
                </Link>
                <span className="tooltip">Gestion-cout</span>
              </li>
              <li>
                <Link to="/etat-chantier">
                  <i className="bx bx-cart-alt"></i>
                  <span className="links_name">Etat-chantier</span>
                </Link>
                <span className="tooltip">Etat-chantier</span>
              </li>
              <li>
                <Link to="/security">
                  <i className="bx bx-shield"></i>
                  <span className="links_name">Security</span>
                </Link>
                <span className="tooltip">Security</span>
              </li>
              <li>
                <Link to="/Gerer-utilisateurs">
                  <i class='bx bxs-user'></i>
                  <span className="links_name">Gerer-utilisateurs</span>
                </Link>
                <span className="tooltip">Gerer-utilisateurs</span>
              </li>
            </>
          )
        }
        <li>
          <Link to="/dashboard">
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Dashboard</span>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <Link to="/archive">
            <i className="bx bx-archive"></i>
            <span className="links_name">Archive</span>
          </Link>
          <span className="tooltip">Archive</span>
        </li>
        <li>
          <Link to="/gestion-cout">
            <i class='bx bx-power-off'></i>
            <span className="links_name">Deconnexion</span>
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default SidBar;