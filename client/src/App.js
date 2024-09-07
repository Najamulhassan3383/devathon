import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { notification } from "antd"; // Ant Design notification
import AdminDashboard from "./layout/AdminDashboard";
import EnrollmentJourny from "./pages/EnrollmentJourny/EnrollmentJourny";
import StudentList from "./pages/StudentList";
import DocumentLibrary from "./pages/DocumentLibrary/DocumentLibrary";
import Record from "./pages/StudentRecord/Record";
import EnrollmentDocuments from "./pages/StudentRecord/EnrollmentDocuments";
import SubDocuments from "./pages/StudentRecord/SubDocuments";
import CampusContent from "./pages/CampusContent/CampusContent";
import MainScreen from "./pages/Messaging/MainScreen";
import MainDashbord from "./pages/EnrollmentJourny/MainDashbord";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Tests from "./pages/Tests/Tests";
import TestDetails from "./pages/Tests/TestDetails";
import TeacherTestSeriesList from "./pages/TeacherTestSeries/TeacherTestSeriesList";
import { useCookies } from "react-cookie";
import CreateTestSeries from "./pages/TeacherTestSeries/CreateTestSeries";

const SERVER_URL = "http://localhost:5000"; // Update this with your actual server URL

function App() {
  const [cookies] = useCookies(["x-auth-token"]); // Get the token from cookies
  const token = cookies["x-auth-token"]; // Extract the token
  const [socket, setSocket] = useState(null);

  // Establish socket connection in App.js
  useEffect(() => {
    if (token) {
      // Connect to the Socket.IO server with the token
      const newSocket = io(SERVER_URL, {
        query: { token }, // Automatically pass the token from cookies
      });

      setSocket(newSocket);

      // Listen for enrollment success notification
      newSocket.on("enrollmentSuccess", (data) => {
        notification.success({
          message: "Enrollment Successful",
          description: data.message,
          placement: "topRight",
        });
      });

      // Listen for unenrollment success notification
      newSocket.on("unenrollmentSuccess", (data) => {
        notification.info({
          message: "Unenrollment Successful",
          description: data.message,
          placement: "topRight",
        });
      });

      // Listen for new test series notification
      newSocket.on("newTestSeries", (data) => {
        notification.info({
          message: "New Test Series Added",
          description: data.message,
          placement: "topRight",
        });
      });

      // Listen for new question notification
      newSocket.on("newQuestion", (data) => {
        notification.info({
          message: `New Question Added to ${data.test_series_name}`,
          description: data.message,
          placement: "topRight",
        });
      });

      // Listen for discussion notifications
      newSocket.on("newDiscussion", (data) => {
        notification.info({
          message: `New Discussion in ${data.test_series_name}`,
          description: data.message,
          placement: "topRight",
        });
      });

      // Listen for solve question notification
      newSocket.on("solveQuestion", (data) => {
        notification.info({
          message: `Question Solved in ${data.test_series_name}`,
          description: `Answer: ${data.correct ? "Correct" : "Incorrect"}`,
          placement: "topRight",
        });
      });

      // Listen for rating added notification
      newSocket.on("addRatingToTestSeries", (data) => {
        notification.info({
          message: `New Rating for ${data.test_series_name}`,
          description: `Rating: ${data.rating}/5, Review: ${data.review}`,
          placement: "topRight",
        });
      });

      // Clean up the socket connection on component unmount
      return () => newSocket.close();
    }
  }, [token]);

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
          <Route path="tests" element={<Tests />} />
          <Route path="tests/:id" element={<TestDetails socket={socket} />} /> {/* Pass the socket */}
          <Route path="document-library" element={<DocumentLibrary />} />
          <Route path="messaging" element={<MainScreen socket={socket} />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="enrollment-document" element={<EnrollmentDocuments />} />
          <Route path="sub-documents" element={<SubDocuments />} />
          <Route path="campus-content" element={<CampusContent />} />
          <Route path="student-record" element={<Record />} />
          {/* <Route path="/create-test-series" element={<CreateTestSeries />} /> */}
          <Route path="test-series" element={<TeacherTestSeriesList />} />
          <Route path="test-series/:id" element={<TestDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
