// import React from "react";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import './UserDetail.css';


// const UserDetail = ({ user }) => {
//     return (

//         <div className="user-detail-chatbox">
//             {/* Navbar */}
//             <div className="user-detail-navbar">
//                 <img
//                     src={`http://localhost:5000/uploads/${user.image}`}
//                     alt={user.name}
//                     className="user-detail-navbar-image"
//                 />
//                 <div className="user-detail-navbar-info">
//                     <h2 className="user-detail-navbar-name">{user.name}</h2>
//                     <p className="user-detail-navbar-profession">{user.profession}</p>
//                 </div>
//             </div>

//             {/* Chat Body */}
//             <div className="user-detail-body">
//                 <p><strong>Phone:</strong> {user.phone}</p>
//                 <p><strong>Email:</strong> {user.gmail}</p>
//                 <p><strong>Bio:</strong> {user.bio}</p>
//             </div>

//             {/* Input Box */}
//             <div className="user-detail-input-box">
//                 <FaPaperclip className="icon file-icon" />
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     className="user-detail-input"
//                 />
//                 <button className="send-button">
//                     <FaPaperPlane className="icon send-icon" />
//                 </button>
//             </div>
//         </div>

//     );
// };

// export default UserDetail;



import React, { useState, useEffect } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import io from 'socket.io-client';
import './UserDetail.css';

const socket = io('http://localhost:5000');  // Connect to backend Socket.IO server

const UserDetail = ({ user, isAdmin }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Listen for incoming messages
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
            // Register the user with their userId
            socket.emit('register', user.id);  // Pass unique user ID to backend
        });

        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [user.id]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            // If admin, send to specific user
            if (isAdmin) {
                const targetUserId = prompt('Enter user ID to send message to:');
                socket.emit('adminSendMessage', targetUserId, message);  // Admin sends message to specific user
            } else {
                socket.emit('sendMessage', message);  // Regular user sends message
            }
            setMessage("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="user-detail-chatbox">
            {/* Navbar */}
            <div className="user-detail-navbar">
                <img
                    src={`http://localhost:5000/uploads/${user.image}`}
                    alt={user.name}
                    className="user-detail-navbar-image"
                />
                <div className="user-detail-navbar-info">
                    <h2 className="user-detail-navbar-name">{user.name}</h2>
                    <p className="user-detail-navbar-profession">{user.profession}</p>
                </div>
            </div>

            {/* Chat Body */}
            <div className="user-detail-body">
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.gmail}</p>
                <p><strong>Bio:</strong> {user.bio}</p>

                {/* Display Messages */}
                <div className="messages">
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
            </div>

            {/* Input Box */}
            <div className="user-detail-input-box">
                <FaPaperclip className="icon file-icon" />
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}  // Listen for keydown event
                    placeholder="Type a message..."
                    className="user-detail-input"
                />
                <button className="send-button" onClick={sendMessage}>
                    <FaPaperPlane className="icon send-icon" />
                </button>
            </div>
        </div>
    );
};

export default UserDetail;


// import React, { useState, useEffect } from "react";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";  // Import ToastContainer and toast
// import io from 'socket.io-client';
// import './UserDetail.css';

// const socket = io('http://localhost:5000');  // Connect to backend Socket.IO server

// const UserDetail = ({ user, isAdmin }) => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);

//     // Listen for incoming messages
//     useEffect(() => {
//         socket.on('connect', () => {
//             console.log('Connected to the server');
//             // Register the user with their userId
//             socket.emit('register', user.id);  // Pass unique user ID to backend
//         });

//         socket.on('receiveMessage', (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//             toast.info(`New message: ${newMessage}`);  // Show toast notification for new message
//         });

//         return () => {
//             socket.off('receiveMessage');
//         };
//     }, [user.id]);

//     const handleMessageChange = (event) => {
//         setMessage(event.target.value);
//     };

//     const sendMessage = () => {
//         if (message.trim()) {
//             // If admin, send to specific user
//             if (isAdmin) {
//                 const targetUserId = prompt('Enter user ID to send message to:');
//                 socket.emit('adminSendMessage', targetUserId, message);  // Admin sends message to specific user
//             } else {
//                 socket.emit('sendMessage', message);  // Regular user sends message
//             }
//             setMessage("");
//         }
//     };

//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             sendMessage();
//         }
//     };

//     return (
//         <div className="user-detail-chatbox">
//             {/* Navbar */}
//             <div className="user-detail-navbar">
//                 <img
//                     src={`http://localhost:5000/uploads/${user.image}`}
//                     alt={user.name}
//                     className="user-detail-navbar-image"
//                 />
//                 <div className="user-detail-navbar-info">
//                     <h2 className="user-detail-navbar-name">{user.name}</h2>
//                     <p className="user-detail-navbar-profession">{user.profession}</p>
//                 </div>
//             </div>

//             {/* Chat Body */}
//             <div className="user-detail-body">
//                 <p><strong>Phone:</strong> {user.phone}</p>
//                 <p><strong>Email:</strong> {user.gmail}</p>
//                 <p><strong>Bio:</strong> {user.bio}</p>

//                 {/* Display Messages */}
//                 <div className="messages">
//                     {messages.map((msg, index) => (
//                         <p key={index}>{msg}</p>
//                     ))}
//                 </div>
//             </div>

//             {/* Input Box */}
//             <div className="user-detail-input-box">
//                 <FaPaperclip className="icon file-icon" />
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={handleMessageChange}
//                     onKeyDown={handleKeyDown}  // Listen for keydown event
//                     placeholder="Type a message..."
//                     className="user-detail-input"
//                 />
//                 <button className="send-button" onClick={sendMessage}>
//                     <FaPaperPlane className="icon send-icon" />
//                 </button>
//             </div>

//             {/* Toast Notification Container */}
//             <ToastContainer />
//         </div>
//     );
// };

// export default UserDetail;
