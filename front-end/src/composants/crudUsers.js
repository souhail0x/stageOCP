import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AddUser from "./addUser";

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
`;

const TableCell = styled.td`
  padding: 12px;
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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [modifiedTable, setmodifiedTable] = useState('');


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

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      setmodifiedTable(Math.random())
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (userId) => {
    console.log("Update user with ID:", userId);
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
    setShowAddUser(true)
  };
  const handleCloseAddUser = () => {
    setShowAddUser(false);
  }

  return (
    <UserListContainer>
      <h1>User List</h1>
      <AddUserButton onClick={handleAddUser}>Ajouter utilisateur</AddUserButton>
      {showAddUser && <AddUser onClose={handleCloseAddUser} />}
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
                <button className="button" onClick={() => handleUpdate(user.id)}>
                  Update
                </button>
                <button className="button" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </UserListContainer>
  );
};

export default UserList;
