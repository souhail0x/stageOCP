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
        <center><div className="logo_name">
          <img style={{width:'45px'}} src={require('../images/BGblast-removebg-preview.png')} alt="Login" />
          <span>BGBLAST</span>

        </div></center>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Acceuil</span>
          </Link>
          <span className="tooltip">Acceuil</span>
        </li>
        {
          !isAdmin ? '' : (
            <>
              <li>
                <Link to="/command">
                  <i className="bx bx-edit"></i>
                  <span className="links_name">Saisir une commande</span>
                </Link>
                <span className="tooltip">Saisir une commande</span>
              </li>
              <li>


                {/* // Assuming you have a state variable called `isDisabled` */}
                <Link to="/sautage">
                  <i className="bx bx-wrench"></i>
                  <span className="links_name">Saisir à sautage</span>
                </Link>

                <span className="tooltip">Saisir à sautage</span>
              </li>
              <li>
                <Link to="/gestion-stock">
                  <i className="bx bx-box"></i>
                  <span className="links_name">Gestion du stock</span>
                </Link>
                <span className="tooltip">Gestion du stock</span>
              </li>
              <li>
                <Link to="/gestion-cout">
                  <i className="bx bx-money"></i>
                  <span className="links_name">Gestion des couts</span>
                </Link>
                <span className="tooltip">Gestion des couts</span>
              </li>
              <li>
                <Link to="/etat-chantier">
                  <i className="bx bx-cart-alt"></i>
                  <span className="links_name">Etat du chantier</span>
                </Link>
                <span className="tooltip">Etat du chantier</span>
              </li>
              <li>
                <Link to="/security">
                  <i className="bx bx-shield"></i>
                  <span className="links_name">Securité</span>
                </Link>
                <span className="tooltip">Securité</span>
              </li>
              <li>
                <Link to="/Gerer-utilisateurs">
                  <i class='bx bxs-user'></i>
                  <span className="links_name">Gérer les utilisateurs</span>
                </Link>
                <span className="tooltip">Gérer les utilisateurs</span>
              </li>
            </>
          )
        }
        <li>
          <Link to="/dashboard">
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Tableau de bord</span>
          </Link>
          <span className="tooltip">Tableau de bord</span>
        </li>
        <li>
          <Link to="/archive">
            <i className="bx bx-archive"></i>
            <span className="links_name">Archive</span>
          </Link>
          <span className="tooltip">Archive</span>
        </li>
        <li>
          <Link to="/logout" >
            <i class='bx bx-power-off'></i>
            <span className="links_name">Déconnexion</span>
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default SidBar;