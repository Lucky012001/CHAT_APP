import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login-Signup/Login';
import Signup from './component/Login-Signup/Signup';
import Dashboard from './component/Dashboard/Dashboard';
import UserDetail from './component/Sidebar/ChatUser/UserDetail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReceiveTab from './component/ReceiveTab ';
 







const App = () => {
  return (

    <Router>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdetail" element={<UserDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        

        <Route path="/receivetab" element={<ReceiveTab/>} />
       
        



      </Routes>
    </Router>

  );
};

export default App;

