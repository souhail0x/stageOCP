import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const LogoutContainer = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  z-index:9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutForm = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 80%;
  max-width: 500px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const ConfirmationMessage = styled.p`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Logout component
const Logout = ({ onCloseLogout }) => {
  const handleLogout = async () => {
    try {
      // Perform logout logic here
      // Example: clear local storage, perform API logout, or redirect the user

      // If using API for logout:
      // await axios.post('/api/logout');

      // Once logout is successful, close the logout modal
      onCloseLogout();
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Optional: Display an error message to the user
    }
  };

  return (
    <LogoutContainer>
      <LogoutForm>
        <CloseButton onClick={onCloseLogout}>X</CloseButton>
        <ConfirmationMessage>
          Êtes-vous sûr de vouloir vous déconnecter ?
        </ConfirmationMessage>
        <ButtonContainer>
          <Button onClick={handleLogout} tabIndex={0}>
            Oui
          </Button>
          <Button onClick={onCloseLogout} tabIndex={0}>
            Non
          </Button>
        </ButtonContainer>
      </LogoutForm>
    </LogoutContainer>
  );
};

export default Logout;
