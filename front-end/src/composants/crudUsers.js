import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: #fff;
`;

const UserTable = ({  handleEdit, handleDelete }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Fetch users data from the API
      fetch('http://127.0.0.1:8000/api/users')
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
    }, []);
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default UserTable;
