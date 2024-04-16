import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const AddUserContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddUserForm = styled.form`
  background-color: #fff;
  padding: 40px; /* Increased padding for larger size */
  border-radius: 12px; /* Increased border radius for smoother edges */
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.5); /* Full-screen background box shadow */
  position: relative;
  width: 80%; /* Adjusted width for larger size */
  max-width: 500px; /* Added max-width to limit size on larger screens */
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const AddUser = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log("Form submitted");
    // Close the addUser popup
    onClose();
  };

  return (
    <AddUserContainer>
      <AddUserForm onSubmit={handleSubmit}>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <Label>
          Username:
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>
        <Label>
          <Checkbox
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Is Admin
        </Label>
        <button className="button" type="submit">Add User</button>
      </AddUserForm>
    </AddUserContainer>
  );
};

export default AddUser;
