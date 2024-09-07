import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../key";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCookies } from "react-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [role, setRole] = useState("");
  const [resendCooldown, setResendCooldown] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["x-auth-token"]);

  useEffect(() => {
    if (cookies['x-auth-token']) {
      axios.get(`${SERVER_URL}/api/user/verify`, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          console.log(res)
          navigate('/');
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }, [cookies]);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const otppp = Math.floor(1000 + Math.random() * 9000);
      const response = await axios.post(`${SERVER_URL}/api/email/send-otp`, {
        email,
        otp: otppp,
      });
      if (response.data.success) {
        setOtp(otppp);
        setOtpSent(true);
        message.success("OTP sent to your email");
      } else {
        message.error(response.data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      // Send OTP first
      sendOtp();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (otp.toString() === enteredOtp.toString()) {
        // OTP verification is successful, proceed with registration
        const response = await axios.post(`${SERVER_URL}/api/user/register`, {
          email,
          password,
          fName,
          lName,
          role,
        });
        if (response.data.success) {
          message.success("Account created successfully!");
          navigate("/login");
        } else {
          message.error(response.data.message);
        }
      } else {
        message.error("Incorrect OTP. Please try again.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendCooldown(true);
      sendOtp(); // Resend OTP
      setTimeout(() => setResendCooldown(false), 30000); // 30 sec cooldown for resend
    } catch (err) {
      console.error(err);
      message.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {otpSent ? "Verify OTP" : "Signup"}
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}
        {!otpSent ? (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fName">
                First Name
              </label>
              <input
                type="text"
                id="fName"
                value={fName}
                onChange={(e) => setfName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="lName">
                Last Name
              </label>
              <input
                type="text"
                id="lName"
                value={lName}
                onChange={(e) => setlName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Signup"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleResendOtp}
              disabled={resendCooldown}
            >
              {resendCooldown ? "Resend in 30 sec" : "Resend OTP"}
            </button>
          </form>
        )}
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:text-blue-600">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
