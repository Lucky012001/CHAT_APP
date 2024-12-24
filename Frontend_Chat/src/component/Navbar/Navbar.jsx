import React, { useState, useEffect } from "react";
import "./navbar.css"; // Import CSS file for styling (optional)
import { FaSignInAlt, FaUserPlus, FaBell } from "react-icons/fa"; // Import notification icon
import { Link } from "react-router-dom";

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data); // Set the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Toggle visibility of the user list dropdown
  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle user card click
  const handleUserClick = (user) => {
    console.log("Selected user:", user);
  };

  return (
    <nav className="navbar">
      {/* Logo and App Name */}
      <div className="navbar-brand">
        <h1 className="app-title">Chat-App</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="navbar-buttons">
        <button className="btn login-btn">
          <Link to="/login" className="navbar-link">
            <FaSignInAlt style={{ color: "white" }} className="icon" /> Login
          </Link>
        </button>
        <button className="btn signup-btn">
          <Link to="/" className="navbar-link">
            <FaUserPlus style={{ color: "white" }} className="icon" /> Signup
          </Link>
        </button>

        {/* Dropdown Button to Show Users */}
        <button
          className="btn users-dropdown-btn"
          onClick={handleToggleDropdown}
        >
          Users <FaBell style={{ color: "white" }} className="icon" />
        </button>


        {/* Users List Dropdown */}
        {isDropdownVisible && (
          <div className="users-dropdown">
            <input
              type="text"
              placeholder="Search users..."
              className="search-bar"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="user-list">
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <div
                    className="user-card"
                    key={user.id}
                    onClick={() => handleUserClick(user)} // On click, select the user
                  >
                    <img
                      src={`http://localhost:5000/uploads/${user.image}`} // Assuming the image path is correct
                      alt={user.name}
                      className="user-image"
                    />
                    <div className="user-details">
                      <h5 className="user-name">{user.name}</h5>
                      <p className="user-profession">{user.profession}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
