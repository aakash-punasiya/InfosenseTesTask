import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

function Dashboard({ token }) {
  const [refreshToken, setRefreshToken] = useState(token);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleRefreshToken = () => {
    fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        expiresInMins: 30,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 401) {
            navigate("/");
          } else if (res.status === 404) {
            console.error("Resource not found");
          } else {
            console.error(`Error: ${res.status}`);
          }
        }
      })
      .then((data) => {
        const { token: _, ...rest } = data;
        setUser(rest);
        setRefreshToken(data.token);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const getUserDetail = () => {
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: refreshToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 401 || res.status === 403) {
            handleRefreshToken();
          } else if (res.status === 404) {
            console.error("Resource not found");
          } else {
            console.error(`Error: ${res.status}`);
          }
        }
        return res.json();
      })
      .then((data) => {
        const { token: _, ...rest } = data;
        setUser(rest);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };
  useEffect(() => {
    getUserDetail();
  }, [refreshToken]);

  return (
    <Navbar>
      <div className="container mx-auto px-4 py-8">
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-500">{user.username}</p>
                </div>
              </div>
            </div>
            <div>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-semibold">ID:</span> {user.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default Dashboard;
