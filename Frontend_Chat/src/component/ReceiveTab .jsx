// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// // Create socket connection
// const socket = io('http://localhost:5000', {
//     withCredentials: true,
// });

// const ReceiveTab = () => {
//     const [receivedMessages, setReceivedMessages] = useState([]);
//     const [message, setMessage] = useState('');

//     // Listen for incoming messages from the server
//     useEffect(() => {
//         socket.on('receiveMessage', (message) => {
//             setReceivedMessages((prevMessages) => [...prevMessages, message]);
//         });

//         // Listen for messages from localStorage (in case of message already sent)
//         const messageFromStorage = localStorage.getItem('messageSent');
//         if (messageFromStorage) {
//             setReceivedMessages((prevMessages) => [...prevMessages, messageFromStorage]);
//         }

//         return () => {
//             socket.off('receiveMessage');
//         };
//     }, []);

//     // Handle sending message
//     const handleSendMessage = () => {
//         if (message.trim() !== '') {
//             socket.emit('sendMessage', message);  // Send message to the server

//             // Instead of adding the message to the UI instantly here, just save it in localStorage
//             localStorage.setItem('messageSent', message);
//             setMessage('');  // Clear the input field
//         }
//     };

//     return (
//         <div className="receive-tab">
//             <h2>Received Messages</h2>
//             <div>
//                 {receivedMessages.length === 0
//                     ? 'No messages yet.'
//                     : receivedMessages.map((msg, index) => (
//                         <div key={index} className="message">
//                             {msg}
//                         </div>
//                     ))}
//             </div>

//             <div className="input-container">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message"
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ReceiveTab;






import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create socket connection
const socket = io('http://localhost:5000', {
    withCredentials: true,
});

const ReceiveTab = () => {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Error fetching users.');
            console.error('Error fetching users', error);
        }
    };

    // Listen for incoming messages from the server
    useEffect(() => {
        fetchUsers();

        socket.on('receiveMessage', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup function to remove the socket listener when the component is unmounted
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Handle sending message
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('sendMessage', message); // Send message to the server

            // Clear the input field
            setMessage('');
        }
    };

    return (
        <div className="container receive-tab mt-5">
            <ToastContainer />

            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="mb-4">Received Messages</h2>
                </div>
            </div>

            {/* Display users */}
            <div className="row mb-4">
                <div className="col-12">
                    <h4 className="mb-3">Users</h4>
                    <ul className="list-group">
                        {users.length === 0 ? (
                            <li className="list-group-item text-center text-muted">No users available</li>
                        ) : (
                            users.map((user, index) => (
                                <li key={index} className="list-group-item">
                                    {user.name} {/* Adjust this to display the relevant user data */}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Display messages */}
            <div className="row">
                <div className="col-12">
                    <div className="message-container">
                        {receivedMessages.length === 0 ? (
                            <p className="text-center text-muted">No messages yet.</p>
                        ) : (
                            receivedMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message p-3 mb-3 rounded ${index % 2 === 0 ? 'bg-light' : 'bg-primary text-white'}`}
                                >
                                    {msg}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Input field and send button */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiveTab;



