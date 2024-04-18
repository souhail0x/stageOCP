import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AddUserContainer = styled.div`
  position: fixed;
  z-index: 9999;
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
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 80%;
  max-width: 500px;
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

const SuccessMessage = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const UpdateUser = ({ onCloseUpdate, userId, newName, newPassword }) => {
    const [username, setUsername] = useState(newName);
    const [password, setPassword] = useState(newPassword);
    const [isAdmin, setIsAdmin] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const updateUser = async (userId, userData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://127.0.0.1:8000/api/users/update/${userId}`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Updated user:", response.data.user);
            isAdmin ? setSuccessMessage(`Admin ${username} modifé(e) avec succès !`) : setSuccessMessage(`Utilisateur ${username} modifé(e) avec succès !`);

        } catch (error) {
            console.error("Error updating user:", error.message);
            // Handle error, e.g., display error message to user
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example usage
        updateUser(userId, {
            name: username,
            password: password,
            isAdmin: isAdmin, // or false
        });
    };

    return (
        <AddUserContainer>
            <AddUserForm onSubmit={handleSubmit}>
                <CloseIcon onClick={onCloseUpdate}>X</CloseIcon>
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                <Label>
                    Username:
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setSuccessMessage("");
                        }}
                        required
                    />
                </Label>
                <Label>
                    Password:
                    <Input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Label>
                <Checkbox
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <Label>Is Admin</Label>

                <button className="button" type="submit">
                    Update User
                </button>
            </AddUserForm>
        </AddUserContainer>
    );
};

export default UpdateUser;
