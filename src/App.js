import Login from './components/Login/Login';
import StudentLogin from './components/Login/StudentLogin';
import AdminLogin from './components/Login/AdminLogin';
import EnterOtp from './components/Login/EnterOtp';
import AdminProfile from "./components/Admin/Profile";
import UploadStudentList from "./components/Admin/UploadStudentList";
import StudentProfile from "./components/Student/Profile";
import ChooseRoom from "./components/Student/ChooseRoom";

function App() {
  return (
    <div>
      {/* <AdminLogin /> */}
      {/* <EnterOtp /> */}
      {/* <StudentLogin /> */}
      {/* <Login /> */}
      {/* <AdminProfile /> */}
      {/* <UploadStudentList /> */}
      {/* <StudentProfile /> */}
      <ChooseRoom />
    </div>
  );
}

export default App;
