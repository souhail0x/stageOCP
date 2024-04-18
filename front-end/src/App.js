import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./composants/HomePage";
import CommandPage from "./composants/CommandPage";
import SautagePage from "./composants/SautagePage";
import GestionStock from "./composants/GestionStock";
import GestionCout from "./composants/GestionCout";
import EtatChantier from "./composants/EtatChantier";
import SidBar from "./composants/Sidebar";
import DashboardPage from "./composants/DashboardPage";
import ArchivePage from "./composants/ArchivePage";
import SecurityPage from "./composants/SecurityPage";
import UserTable from "./composants/crudUsers";
import Login from "./composants/Login";
import UserList from "./composants/crudUsers";
import Logout from "./composants/logout";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin as false
  const [isLogged, setIsLogged] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(true);

  // Function to handle closing the logout modal and navigate back
  const onCloseLogout = () => {

    setIsLogoutModalOpen(false); // Close the modal
    // Navigate back to the home page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (isAdmin) => {
    setIsLogged(true); // Set isLogged to true upon successful login
    setIsAdmin(isAdmin); // Set isAdmin based on the login response
  };

  const handleLogout = () => {
    setIsLogged(false); // Set isLogged to false upon logout
    setIsAdmin(false); // Set isAdmin to false upon logout
  };

  console.log(isAdmin);

  return (
    <>

      {!isLogged ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Router>
            <SidBar isAdmin={isAdmin} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {isAdmin ? (
                <>
                  <Route path="/sautage" element={<SautagePage />} />
                  <Route path="/command" element={<CommandPage />} />
                  <Route path="/gestion-stock" element={<GestionStock />} />
                  <Route path="/gestion-cout" element={<GestionCout />} />
                  <Route path="/etat-chantier" element={<EtatChantier />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/gerer-utilisateurs" element={<UserList />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/archive" element={<ArchivePage />} />
                </>
              ) :
                (<>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/archive" element={<ArchivePage />} />
                  <Route path="/logout" element={<Logout />} />


                </>)
              }
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
