import React, { useState, useEffect } from "react";
import "../UserList.css";
import { Navbar } from "./Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Navbar>

    <div className="user-list-container">
      <h2>User List</h2>
      <div className="user-list">
        {users?.users?.map((user) => (
          <div className="user" key={user.id}>
            <div>
              <p>
                <strong>UserId:</strong> {user.id}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>FirstName:</strong> {user.firstName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <img src={user.image} style={{ maxHeight: '130px', width: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default UserList;
