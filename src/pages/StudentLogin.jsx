import React from 'react';
import Navbar from "../components/LoginNavbar";
import StudentLogin from "../components/Login/StudentLogin";

const Login = () => {
  return (
    <div>
        <Navbar />
        <StudentLogin />
    </div>
  )
}

export default Login