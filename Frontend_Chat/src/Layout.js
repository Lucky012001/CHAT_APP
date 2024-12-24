import React from 'react';
import Navbar from '.././src/component/Navbar/Navbar';
import Sidebar from '.././src/component/Sidebar/Sidebar';
import './Layout.css';


const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <div className="content">
          {children} {/* Render any child content here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
