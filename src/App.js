import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import EnterOtp from './pages/EnterOtp';
// import AdminProfile from "./components/Admin/Profile";
import UploadStudentList from "./components/Admin/UploadStudentList";
// import StudentProfile from "./components/Student/Profile";
import ChooseRoom from "./components/Student/ChooseRoom";
import Navbar from "./components/Navbar";
import StudentProfile from './pages/StudentProfile';
import AdminProfile from './pages/AdminProfile';
import StudentUploadTransaction from './pages/StudentUploadTransaction';
// import Table from "./components/Table/FiltertingTable"
// import Table from "./components/Table/RowSelection"
import Table from "./components/Table/PaginationTable"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student_login" element={<StudentLogin />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/enter_otp" element={<EnterOtp />} />
          <Route path="/admin_profile" element={<AdminProfile />} />
          <Route path="/student_profile" element={<StudentProfile />} />
          {/* <Route path="/societies">
            <Route index element={<Societies />} />
            <Route path=":societyid">
              <Route index element={<TechnicalSociety />} />
              <Route path=":clubid" element={<ThinkIndia />} />
            </Route>
          </Route> */} 

        </Routes>
      </Router>
    </>
  );
}

export default App;
