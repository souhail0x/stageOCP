// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './composants/HomePage';
import CommandPage from './composants/CommandPage';
import SautagePage from './composants/SautagePage';
import GestionStock from './composants/GestionStock';
import GestionCout from './composants/GestionCout';
import EtatChantier from './composants/EtatChantier';
import SidBar from './composants/Sidebar';
import DashboardPage from './composants/DashboardPage';
import ArchivePage from './composants/ArchivePage';
import SecurityPage from './composants/SecurityPage';
import UserTable from './composants/crudUsers';


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Router>
        <SidBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {
            isAdmin ? (
              <>
                <Route path="/sautage" element={<SautagePage />} />
                <Route path="/command" element={<CommandPage />} />
                <Route path="/gestion-stock" element={<GestionStock />} />
                <Route path="/gestion-cout" element={<GestionCout />} />
                <Route path="/etat-chantier" element={<EtatChantier />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/Gerer-utilisateurs" element={<UserTable/>} />




              </>


            ) : <></>
          }

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/archive" element={<ArchivePage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
