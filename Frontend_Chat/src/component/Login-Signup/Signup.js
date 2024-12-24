// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Prepare FormData to include image and other fields
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (image) {
//       formData.append('image', image); // Attach the image file
//     }

//     try {
//       console.log("Sending signup data:", { username, email, password, image });
//       const response = await axios.post('http://localhost:2000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
//       });
//       console.log("Signup response:", response.data);

//       // Display success toast notification
//       toast.success('Signup successful! Please log in to continue.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       // Redirect to login page after 3 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);

//     } catch (err) {
//       console.error("Signup error:", err);

//       // Display error toast notification
//       toast.error('Error signing up. Please try again.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="card signup-card">
//         <div className="card-body">
//           <h2 className="card-title signup-heading">Sign Up</h2>
//           <form onSubmit={handleSignup} encType="multipart/form-data">
//             {/* Username Field */}
//             <div className="form-group">
//               <label className="label">Username</label>
//               <input
//                 type="text"
//                 className="form-control input"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Email Field */}
//             <div className="form-group">
//               <label className="label">Email address</label>
//               <input
//                 type="email"
//                 className="form-control input"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password Field */}
//             <div className="form-group">
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 className="form-control input"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Image Upload Field */}
//             <div className="form-group">
//               <label className="label">Profile Image</label>
//               <input
//                 type="file"
//                 className="form-control input"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 accept="image/*"
//               />
//             </div>

//             <button type="submit" className="submit-btn btn-primary submit-btn">
//               Sign Up
//             </button>
//           </form>
//           <p className="login-link">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>
//       </div>

//       {/* Toast container to display notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Prepare FormData to include image and other fields
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image); // Attach the image file
    }

    try {
      console.log("Sending signup data:", { username, email, password, image });
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
      });
      console.log("Signup response:", response.data);

      // Store username and other info in localStorage
      localStorage.setItem('username', username); // Store the username
      // Optionally, store other information like token or user ID
      // localStorage.setItem('token', response.data.token); 

      // Display success toast notification
      toast.success('Signup successful! Please log in to continue.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      console.error("Signup error:", err);

      // Display error toast notification
      toast.error('Error signing up. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <div className="card-body">
          <h2 className="card-title signup-heading">Sign Up</h2>
          <form onSubmit={handleSignup} encType="multipart/form-data">
            {/* Username Field */}
            <div className="form-group">
              <label className="label">Username</label>
              <input
                type="text"
                className="form-control input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="label">Email address</label>
              <input
                type="email"
                className="form-control input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                className="form-control input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Image Upload Field */}
            <div className="form-group">
              <label className="label">Profile Image</label>
              <input
                type="file"
                className="form-control input"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <button type="submit" className="submit-btn btn-primary submit-btn">
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;

