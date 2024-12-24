import React from 'react'
import Layout from '../../Layout';

const Dashboard = ({ }) => {
  return (
    <Layout>

    </Layout>
  );
};

export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// // Create socket connection
// const socket = io('http://localhost:5000', {
//   withCredentials: true,
// });

// const ChatApp = () => {
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   // Listen for incoming messages from the server
//   useEffect(() => {
//     socket.on('receiveMessage', (message) => {
//       setReceivedMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Listen for messages from localStorage (in case of message already sent)
//     const messageFromStorage = localStorage.getItem('messageSent');
//     if (messageFromStorage) {
//       setReceivedMessages((prevMessages) => [...prevMessages, messageFromStorage]);
//     }

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);

//   // Handle sending message
//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('sendMessage', message);  // Send message to the server
//       setReceivedMessages((prevMessages) => [...prevMessages, message]);  // Optionally add it to the UI instantly
//       localStorage.setItem('messageSent', message);  // Save sent message to localStorage
//       setMessage('');
//     }
//   };

//   return (
//     <div className="chat-app">
//       <div className="send-tab">
//         <h2>Send Message</h2>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>

//       <div className="receive-tab">
//         <h2>Received Messages</h2>
//         <div>
//           {receivedMessages.length === 0
//             ? 'No messages yet.'
//             : receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 {msg}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
