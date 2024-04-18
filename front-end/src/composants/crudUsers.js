import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import Loader from "./spinnerLoader";

const UserListContainer = styled.div`
  max-width: 800px;
  margin: 10px auto;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: left;
  color:black;
  text-decoration:none;

`;

const TableCell = styled.td`
  padding: 12px;
  color:white;
  border: 1px solid #ddd;
  text-align: left;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
`;

const AddUserButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  margin: 0px 5px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: #45a049
`;
const SuccessMessage = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false); // Initialize showUpdateUser state
  const [modifiedTable, setModifiedTable] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState('');
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(false); // Set isLoading to false after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout when component unmounts
  }, [modifiedTable]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [modifiedTable]);

  const handleDelete = async (userId, isAdmin, username) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      setModifiedTable(Math.random())
      isAdmin ? setSuccessMessage(`Admin ${username} supprimé(e) avec succès !`) : setSuccessMessage(`Utilisateur ${username} supprimé(e) avec succès !`);

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (userId, username, pass) => {
    setNewName(username);
    setNewPassword(pass);
    setUserId(userId);
    setShowUpdateUser(true); // Set showUpdateUser to true when Update button is clicked
  };

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleCloseAddUser = () => {
    setShowAddUser(false);
    setModifiedTable(Math.random())
  };

  const handleCloseUpdateUser = () => {
    setShowUpdateUser(false); // Close the UpdateUser component
  };

  return (
    <>
      {
        isLoaded ? (
          <Loader />

        ) : (
          <UserListContainer>
            <h1>User List</h1>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            <AddUserButton onClick={handleAddUser}>Ajouter utilisateur</AddUserButton>
            {showAddUser && <AddUser onClose={handleCloseAddUser} />}
            {showUpdateUser && ( // Render UpdateUser component conditionally based on showUpdateUser state
              <UpdateUser
                userId={userId}
                newName={newName}
                newPassword={newPassword}
                onCloseUpdate={handleCloseUpdateUser}
              />
            )}
            <UserTable>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.isAdmin ? "Admin" : "Utilisateur"}</TableCell>
                    <TableCell>
                      <button className="button" onClick={() => handleUpdate(user.id, user.name, user.password)}>
                        Update
                      </button>
                      <button className="button" onClick={() => handleDelete(user.id, user.isAdmin, user.name)}>
                        Delete
                      </button>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </UserTable>
          </UserListContainer>
        )
      }
    </>

  );
};

export default UserList;
