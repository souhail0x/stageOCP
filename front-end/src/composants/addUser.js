import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Loader from "./spinnerLoader";

const AddUserContainer = styled.div`
  position: fixed;
  z-index:9999;
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
const SuccessMessage = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;
const AddUser = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoaded(true);
        setSuccessMessage('')
        setTimeout(() => {
            setIsLoaded(false); // Set isLoading to false after 3 seconds
            
        }, 2000);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: username,
                    password,
                    isAdmin,
                })
            });
            const data = await response.json();
            console.log("Response:", data);

            isAdmin ? setSuccessMessage(`Admin ${username} ajouté avec succès !`) : setSuccessMessage(`Utilisateur ${username} ajouté avec succès !`);



            // Close the addUser popup after a brief delay



        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <AddUserContainer>
            <AddUserForm onSubmit={handleSubmit}>
                {isLoaded ? (<Loader />) : ''}

                <CloseIcon onClick={onClose}>X</CloseIcon>
                {successMessage && !isLoaded && <SuccessMessage>{successMessage}</SuccessMessage>}

                <Label>
                    Nom de l'utilisateur:
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setSuccessMessage('') }}
                        required
                    />
                </Label>
                <Label>
                    Mot de passe:
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
                <Label>Est Admin</Label>

                <button className="button" type="submit">Add User</button>
            </AddUserForm>

        </AddUserContainer>
    );
};


export default AddUser;
