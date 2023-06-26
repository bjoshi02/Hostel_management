import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import AdminOtp from './pages/AdminOtp';
import EnterOtp from './pages/EnterOtp';
import AllocateStudentRoom from "./pages/AllocateStudentRoom"
import UploadStudentList from "./components/Admin/UploadStudentList";
import ChooseRoom from "./pages/ChooseRoom";
import Navbar from "./components/Navbar";
import StudentProfile from './pages/StudentProfile';
import AdminProfile from './pages/AdminProfile';
import RoomRequest from './pages/RoomRequest';
import StudentUploadTransaction from './pages/StudentUploadTransaction';
import Table from "./components/Table/PaginationTable"
import RowSelection from "./components/Table/RowSelection";
// import Table from "./components/Table/FiltertingTable"
// import Table from "./components/Table/RowSelection"


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
          <Route path="/admin_otp" element={<AdminOtp />} />
          <Route path="/student_profile" element={<StudentProfile />} />
          <Route path="/choose_room" element={<ChooseRoom />} />
          <Route path="/upload_transaction" element={<StudentUploadTransaction />} />
          {/* <Route path="/societies">
            <Route index element={<Societies />} />
            <Route path=":societyid">
              <Route index element={<TechnicalSociety />} />
              <Route path=":clubid" element={<ThinkIndia />} />
            </Route>
          </Route> */} 
          <Route path="/room_request" element={<RoomRequest />} />
          <Route path="/allocate_admin" element = {<AllocateStudentRoom/>}/>
          {/* <Route path="/table" element={<RowSelection />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
