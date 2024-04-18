import { Title } from "chart.js";
import React, { useState } from "react";
import styled from "styled-components";

const LogoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const message = styled.h3`
 
`;

const PopUp = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #ff4d4d; /* Red for "Yes" button */
    color: white;
  }

  &:last-child {
    background-color: #4caf50; /* Green for "No" button */
    color: white;
  }
`;

function LogoutPopUp() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };
    function redirectToRoot() {
        window.location.href = '/';

    }
    const handleLogout = async () => {
        console.log("Logged out");
        redirectToRoot();
        setIsOpen(false); try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("Logged out");
            redirectToRoot();






            // Close the addUser popup after a brief delay



        } catch (error) {
            console.error("Error submitting form:", error);
        }



        // Implement your logout functionality here
    };

    return (
        <>
            {isOpen && (
                <LogoutContainer>
                    <PopUp>
                        <CloseIcon onClick={handleClose}>&times;</CloseIcon>
                        <message>Êtes-vous sûr de vouloir vous déconnecter?</message>
                        <ButtonsContainer>
                            <button className="button" onClick={handleLogout}>Yes</button>
                            <button className="button" style={{ backgroundColor: 'red' }} onClick={handleClose}>No</button>
                        </ButtonsContainer>
                    </PopUp>
                </LogoutContainer>
            )}
        </>
    );
}

export default LogoutPopUp;
