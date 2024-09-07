import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './layout/AdminDashboard';
//eslint-disable-next-line
import EnrollmentJourny from './pages/EnrollmentJourny/EnrollmentJourny';
import StudentList from './pages/StudentList';
import DocumentLibrary from './pages/DocumentLibrary/DocumentLibrary';
import Record from './pages/StudentRecord/Record';
import EnrollmentDocuments from './pages/StudentRecord/EnrollmentDocuments';
import SubDocuments from './pages/StudentRecord/SubDocuments';
import CampusContent from './pages/CampusContent/CampusContent';
import MainScreen from './pages/Messaging/MainScreen';
import MainDashbord from './pages/EnrollmentJourny/MainDashbord';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<AdminDashboard />}>
          <Route index element={<MainDashbord />} />
          <Route path="dashboard" element={<MainDashbord />} />
          <Route path="users" element={<MainDashbord />} />
          <Route path="tests" element={<MainDashbord />} />
          <Route path="test/:id" element={<MainDashbord />} />
          <Route path="document-library" element={<DocumentLibrary />} />
          <Route path="messaging" element={<MainScreen />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="enrollment-document" element={<EnrollmentDocuments />} />
          <Route path="sub-documents" element={<SubDocuments />} />
          <Route path="campus-content" element={<CampusContent />} />
          <Route path="student-record" element={<Record />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
