// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FaUserPlus } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Sidebar.css";

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true); // Sidebar starts open
//     const [showModal, setShowModal] = useState(false); // Modal visibility
//     const [searchQuery, setSearchQuery] = useState(""); // For search input

//     const [userData, setUserData] = useState({
//         name: "",
//         phone: "",
//         gmail: "",
//         profession: "",
//         bio: "",
//         image: "",
//     });
//     const [users, setUsers] = useState([]); // State to store fetched users

//     // Fetch users from the API
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/users");
//             setUsers(response.data); // Set fetched data
//         } catch (error) {
//             toast.error("Error fetching users.");
//             console.error("Error fetching users", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers(); // Call fetchUsers when component mounts
//     }, []);

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create FormData to send data with the file
//         const formData = new FormData();
//         formData.append("name", userData.name);
//         formData.append("phone", userData.phone);
//         formData.append("gmail", userData.gmail);
//         formData.append("profession", userData.profession);
//         formData.append("bio", userData.bio);
//         if (userData.image) {
//             formData.append("image", userData.image);
//         }

//         try {
//             await axios.post("http://localhost:5000/api/adduser", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             toast.success("User added successfully!");
//             setShowModal(false);
//             setUserData({ name: "", phone: "", gmail: "", profession: "", bio: "", image: "" });
//             fetchUsers(); // Refresh user list after adding a new user
//         } catch (error) {
//             toast.error("Error adding user. Please try again.");
//             console.error("Error adding user", error);
//         }
//     };

//     // Toggle sidebar open/close
//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     // Show or hide the modal
//     const handleAddUserClick = () => {
//         setShowModal(!showModal);
//     };

//     return (
//         <>
//             <motion.div
//                 className={`sidebar ${isOpen ? "open" : "closed"}`}
//                 transition={{ duration: 0.5 }}
//             >
//                 <div className="sidebar-header">
//                     <button onClick={toggleSidebar} className="toggle-btn">
//                         {isOpen ? "←" : "→"}
//                     </button>

//                     {/* Add User Button */}
//                     <button onClick={handleAddUserClick} className="user-add-btn">
//                         <FaUserPlus className="user-add-icon" />
//                         {isOpen && <span>Add User</span>}
//                     </button>
//                 </div>


//                 {/* User List */}
//                 <div className="user-list">
//                                      {/* Search Bar */}
//                      <input
//                          type="text"
//                          placeholder="Search users..."
//                          className="search-bar"
//                          onChange={(e) => setSearchQuery(e.target.value)}
//                      />
//                     {users
//                         .filter((user) =>
//                             user.name.toLowerCase().includes(searchQuery.toLowerCase())
//                         )
//                         .map((user) => (
//                             <div className="user-card" key={user.id}>
//                                 <img
//                                     src={`http://localhost:5000/uploads/${user.image}`}
//                                     alt={user.name}
//                                     className="user-image"
//                                 />
//                                 <div className="user-details">
//                                     <h5 className="user-name">{user.name}</h5>
//                                     <p className="user-profession">{user.profession}</p>
//                                 </div>
//                             </div>
//                         ))}
//                 </div>

//             </motion.div>

//             {/* Modal for Adding User */}
//             {showModal && (
//                 <div className="modal fade show" style={{ display: "block" }} aria-hidden="false">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Add New User</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={handleAddUserClick}
//                                     aria-label="Close"
//                                 ></button>
//                             </div>

//                             <div className="modal-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="name" className="form-label">Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="name"
//                                             name="name"
//                                             value={userData.name}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter name"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="phone" className="form-label">Phone</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="phone"
//                                             name="phone"
//                                             value={userData.phone}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter phone"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="gmail" className="form-label">Gmail</label>
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             id="gmail"
//                                             name="gmail"
//                                             value={userData.gmail}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter Gmail"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="profession" className="form-label">Profession</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="profession"
//                                             name="profession"
//                                             value={userData.profession}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter profession"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="bio" className="form-label">Bio</label>
//                                         <textarea
//                                             className="form-control"
//                                             id="bio"
//                                             name="bio"
//                                             value={userData.bio}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter bio"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="image" className="form-label">Image</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             id="image"
//                                             name="image"
//                                             onChange={(e) =>
//                                                 setUserData({ ...userData, image: e.target.files[0] })
//                                             }
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary">
//                                         Add User
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </>
//     );
// };

// export default Sidebar;







// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FaUserPlus } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Sidebar.css";

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true); // Sidebar starts open
//     const [showModal, setShowModal] = useState(false); // Modal visibility
//     const [searchQuery, setSearchQuery] = useState(""); // For search input
//     const [userData, setUserData] = useState({
//         name: "",
//         phone: "",
//         gmail: "",
//         profession: "",
//         bio: "",
//         image: "",
//     });
//     const [users, setUsers] = useState([]); // State to store fetched users
//     const [selectedUser, setSelectedUser] = useState(null); // State for selected user

//     // Fetch users from the API
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/users");
//             setUsers(response.data); // Set fetched data
//         } catch (error) {
//             toast.error("Error fetching users.");
//             console.error("Error fetching users", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers(); // Call fetchUsers when component mounts
//     }, []);

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create FormData to send data with the file
//         const formData = new FormData();
//         formData.append("name", userData.name);
//         formData.append("phone", userData.phone);
//         formData.append("gmail", userData.gmail);
//         formData.append("profession", userData.profession);
//         formData.append("bio", userData.bio);
//         if (userData.image) {
//             formData.append("image", userData.image);
//         }

//         try {
//             await axios.post("http://localhost:5000/api/adduser", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             toast.success("User added successfully!");
//             setShowModal(false);
//             setUserData({ name: "", phone: "", gmail: "", profession: "", bio: "", image: "" });
//             fetchUsers(); // Refresh user list after adding a new user
//         } catch (error) {
//             toast.error("Error adding user. Please try again.");
//             console.error("Error adding user", error);
//         }
//     };

//     // Toggle sidebar open/close
//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     // Show or hide the modal
//     const handleAddUserClick = () => {
//         setShowModal(!showModal);
//     };

//     // Handle user click to show user details on the right panel
//     const handleUserClick = (user) => {
//         setSelectedUser(user); // Set the selected user
//     };

//     return (
//         <>
//             <motion.div
//                 className={`sidebar ${isOpen ? "open" : "closed"}`}
//                 transition={{ duration: 0.5 }}
//             >
//                 <div className="sidebar-header">
//                     <button onClick={toggleSidebar} className="toggle-btn">
//                         {isOpen ? "←" : "→"}
//                     </button>

//                     {/* Add User Button */}
//                     <button onClick={handleAddUserClick} className="user-add-btn">
//                         <FaUserPlus className="user-add-icon" />
//                         {isOpen && <span>Add User</span>}
//                     </button>
//                 </div>

//                 {/* User List */}
//                 <div className="user-list">
//                     {/* Search Bar */}
//                     <input
//                         type="text"
//                         placeholder="Search users..."
//                         className="search-bar"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     {users
//                         .filter((user) =>
//                             user.name.toLowerCase().includes(searchQuery.toLowerCase())
//                         )
//                         .map((user) => (
//                             <div
//                                 className="user-card"
//                                 key={user.id}
//                                 onClick={() => handleUserClick(user)} // On click, show user details
//                             >
//                                 <img
//                                     src={`http://localhost:5000/uploads/${user.image}`}
//                                     alt={user.name}
//                                     className="user-image"
//                                 />
//                                 <div className="user-details">
//                                     <h5 className="user-name">{user.name}</h5>
//                                     <p className="user-profession">{user.profession}</p>
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             </motion.div>

//             {/* Right-side User Details Panel */}
//             {selectedUser && (
//                 <div className="user-details-panel">
//                     <div className="panel-header">
//                         <button onClick={() => setSelectedUser(null)} className="close-btn">
//                             Close
//                         </button>
//                     </div>
//                     <div className="panel-body">
//                         <img
//                             src={`http://localhost:5000/uploads/${selectedUser.image}`}
//                             alt={selectedUser.name}
//                             className="selected-user-image"
//                         />
//                         <h4>{selectedUser.name}</h4>
//                         <p>{selectedUser.profession}</p>
//                         <p>{selectedUser.bio}</p>
//                         <p>Email: {selectedUser.gmail}</p>
//                         <p>Phone: {selectedUser.phone}</p>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for Adding User */}
//             {showModal && (
//                 <div className="modal fade show" style={{ display: "block" }} aria-hidden="false">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Add New User</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={handleAddUserClick}
//                                     aria-label="Close"
//                                 ></button>
//                             </div>

//                             <div className="modal-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="name" className="form-label">Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="name"
//                                             name="name"
//                                             value={userData.name}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter name"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="phone" className="form-label">Phone</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="phone"
//                                             name="phone"
//                                             value={userData.phone}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter phone"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="gmail" className="form-label">Gmail</label>
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             id="gmail"
//                                             name="gmail"
//                                             value={userData.gmail}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter Gmail"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="profession" className="form-label">Profession</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="profession"
//                                             name="profession"
//                                             value={userData.profession}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter profession"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="bio" className="form-label">Bio</label>
//                                         <textarea
//                                             className="form-control"
//                                             id="bio"
//                                             name="bio"
//                                             value={userData.bio}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter bio"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="image" className="form-label">Image</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             id="image"
//                                             name="image"
//                                             onChange={(e) =>
//                                                 setUserData({ ...userData, image: e.target.files[0] })
//                                             }
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary">
//                                         Add User
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </>
//     );
// };

// export default Sidebar;







// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FaUserPlus } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Sidebar.css";
// import UserDetail from "./ChatUser/UserDetail";


// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [userData, setUserData] = useState({
//         name: "",
//         phone: "",
//         gmail: "",
//         profession: "",
//         bio: "",
//         image: "",
//     });
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null); // State to store selected user

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/users");
//             setUsers(response.data);
//         } catch (error) {
//             toast.error("Error fetching users.");
//             console.error("Error fetching users", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", userData.name);
//         formData.append("phone", userData.phone);
//         formData.append("gmail", userData.gmail);
//         formData.append("profession", userData.profession);
//         formData.append("bio", userData.bio);
//         if (userData.image) {
//             formData.append("image", userData.image);
//         }

//         try {
//             await axios.post("http://localhost:5000/api/adduser", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             toast.success("User added successfully!");
//             setShowModal(false);
//             setUserData({ name: "", phone: "", gmail: "", profession: "", bio: "", image: "" });
//             fetchUsers();
//         } catch (error) {
//             toast.error("Error adding user. Please try again.");
//             console.error("Error adding user", error);
//         }
//     };

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleAddUserClick = () => {
//         setShowModal(!showModal);
//     };

//     // Handle user card click to select the user
//     const handleUserClick = (user) => {
//         setSelectedUser(user); // Set the clicked user as selected
//     };

//     return (
//         <>
//             <motion.div
//                 className={`sidebar ${isOpen ? "open" : "closed"}`}
//                 transition={{ duration: 0.5 }}
//             >
//                 <div className="sidebar-header">
//                     <button onClick={toggleSidebar} className="toggle-btn">
//                         {isOpen ? "←" : "→"}
//                     </button>
//                     <button onClick={handleAddUserClick} className="user-add-btn">
//                         <FaUserPlus className="user-add-icon" />
//                         {isOpen && <span>Add User</span>}
//                     </button>
//                 </div>

//                 <div className="user-list">
//                     <input
//                         type="text"
//                         placeholder="Search users..."
//                         className="search-bar"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     {users
//                         .filter((user) =>
//                             user.name.toLowerCase().includes(searchQuery.toLowerCase())
//                         )
//                         .map((user) => (
//                             <div
//                                 className="user-card"
//                                 key={user.id}
//                                 onClick={() => handleUserClick(user)} // On click, select the user
//                             >
//                                 <img
//                                     src={`http://localhost:5000/uploads/${user.image}`}
//                                     alt={user.name}
//                                     className="user-image"
//                                 />
//                                 <div className="user-details">
//                                     <h5 className="user-name">{user.name}</h5>
//                                     <p className="user-profession">{user.profession}</p>
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             </motion.div>

//             {/* Display the selected user data in another component */}
//             {selectedUser && <UserDetail user={selectedUser} />}

//             {/* Modal for Adding User */}
//             {showModal && (
//                 <div className="modal fade show" style={{ display: "block" }} aria-hidden="false">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Add New User</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={handleAddUserClick}
//                                     aria-label="Close"
//                                 ></button>
//                             </div>

//                             <div className="modal-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="name" className="form-label">Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="name"
//                                             name="name"
//                                             value={userData.name}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter name"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="phone" className="form-label">Phone</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="phone"
//                                             name="phone"
//                                             value={userData.phone}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter phone"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="gmail" className="form-label">Gmail</label>
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             id="gmail"
//                                             name="gmail"
//                                             value={userData.gmail}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter Gmail"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="profession" className="form-label">Profession</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="profession"
//                                             name="profession"
//                                             value={userData.profession}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter profession"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="bio" className="form-label">Bio</label>
//                                         <textarea
//                                             className="form-control"
//                                             id="bio"
//                                             name="bio"
//                                             value={userData.bio}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter bio"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="image" className="form-label">Image</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             id="image"
//                                             name="image"
//                                             onChange={(e) =>
//                                                 setUserData({ ...userData, image: e.target.files[0] })
//                                             }
//                                         />
//                                     </div>
//                                     <button type="submit" className="btn btn-primary">
//                                         Add User
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </>
//     );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import UserDetail from "./ChatUser/UserDetail";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        gmail: "",
        profession: "",
        bio: "",
        image: "",
    });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            toast.error("Error fetching users.");
            console.error("Error fetching users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            // Get messages from localStorage for the selected user
            const savedMessages = JSON.parse(localStorage.getItem(selectedUser.id)) || [];
            setMessages(savedMessages);
        }
    }, [selectedUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("phone", userData.phone);
        formData.append("gmail", userData.gmail);
        formData.append("profession", userData.profession);
        formData.append("bio", userData.bio);
        if (userData.image) {
            formData.append("image", userData.image);
        }

        try {
            await axios.post("http://localhost:5000/api/adduser", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("User added successfully!");
            setShowModal(false);
            setUserData({ name: "", phone: "", gmail: "", profession: "", bio: "", image: "" });
            fetchUsers();
        } catch (error) {
            toast.error("Error adding user. Please try again.");
            console.error("Error adding user", error);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleAddUserClick = () => {
        setShowModal(!showModal);
    };

    // Handle user card click to select the user
    const handleUserClick = (user) => {
        setSelectedUser(user); // Set the clicked user as selected
        setMessages([]); // Clear messages when switching users
    };

    // Send message to the selected user
    const handleSendMessage = (message) => {
        if (message.trim() !== '') {
            const msg = {
                sender: 'current_user_id', // Use actual user ID
                receiver: selectedUser.id,
                content: message
            };

            // Store message in localStorage
            const savedMessages = JSON.parse(localStorage.getItem(selectedUser.id)) || [];
            savedMessages.push(msg);
            localStorage.setItem(selectedUser.id, JSON.stringify(savedMessages));

            // Update the state for UI
            setMessages(savedMessages);
        }
    };

    return (
        <>
            <motion.div
                className={`sidebar ${isOpen ? "open" : "closed"}`}
                transition={{ duration: 0.5 }}
            >
                <div className="sidebar-header">
                    <button onClick={toggleSidebar} className="toggle-btn">
                        {isOpen ? "←" : "→"}
                    </button>
                    <button onClick={handleAddUserClick} className="user-add-btn">
                        <FaUserPlus className="user-add-icon" />
                        {isOpen && <span>Add User</span>}
                    </button>
                </div>

                <div className="user-list">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="search-bar"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                                    src={`http://localhost:5000/uploads/${user.image}`}
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
            </motion.div>

            {/* Display the selected user data in another component */}
            {selectedUser && (
                <UserDetail user={selectedUser} messages={messages} onSendMessage={handleSendMessage} />
            )}

            {/* Modal for Adding User */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleAddUserClick}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    {/* User form fields */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default Sidebar;
