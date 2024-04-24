import React from "react";
import styled from "styled-components";

const PopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: "rgba(0, 0, 0, 0.5)";
  backdrop-filter: blur(5px); /* Add blur effect */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #13A538;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  width: 150px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#131419" : "#9e9ea4")};
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
    color: #13A538; 
  }
`;

function ConfirmationPopup({ message, onConfirm, onClose }) {
  return (
    <PopupBackdrop>
      <PopupContent>
        <p>{message}</p>
        <br/>
        <div>
          <Button onClick={onConfirm} primary>
            Confirmer
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </PopupContent>
    </PopupBackdrop>
  );
}

export default ConfirmationPopup;
