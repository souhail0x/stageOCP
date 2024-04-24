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
import LogoutPopUp from "./composants/logout";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLogged, setIsLogged] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Function to handle closing the logout modal
  const onCloseLogout = () => {
    setIsLogoutModalOpen(false);
  };

  // Function to handle logging out
  const handleLogout = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setIsLogoutModalOpen(false);
  };

  const handleLogin = (isAdmin) => {
    setIsLogged(true);
    setIsAdmin(isAdmin);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };


  return (
    <>
      {!isLogged ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Router>
            <SidBar
              isAdmin={isAdmin}
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              onLogout={() => setIsLogoutModalOpen(true)}
            />
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
                  <Route path="/logout" element={<LogoutPopUp />} />

                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/archive" element={<ArchivePage />} />
                  <Route path="/logout" element={<LogoutPopUp />} />



                </>
              )}
            </Routes>
          </Router>
        </div>
      )}

      {isLogoutModalOpen && (<LogoutPopUp
        onCloseLogout={() => setIsLogoutModalOpen(false)}

      />)}


    </>
  );
}


export default App;
