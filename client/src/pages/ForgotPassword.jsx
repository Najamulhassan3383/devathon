import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { SERVER_URL } from "../key";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const navigate = useNavigate();

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_URL}/api/user/check-email`, { email })
      .then(async(res) => {
        if (res.data.success) {
          const otpp = Math.floor(1000 + Math.random() * 9000);
          setOtp(otpp);
          try {
            setLoading(true);
            const response = await axios.post(`${SERVER_URL}/api/email/send-otp`, {
              email,
              otp: otpp
            });
            if (response.data.success) {
              setOtpSent(true);
              message.success("OTP sent to your email");
            } else {
              message.error(response.data.message);
            }
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError("Failed to send OTP. Please try again.");
            setLoading(false);
            setTimeout(() => setError(""), 3000);
          }
        } else {
          message.error("Account not found");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Account not found");
        return;
      });
  };

  // Step 2: Verify OTP and change password
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (otp.toString() === enteredOtp.toString()) {
        // OTP verified, proceed with changing the password
        if (password === confirmPassword) {
          const response = await axios.post(
            `${SERVER_URL}/api/user/change-password`,
            {
              email,
              password,
            }
          );
          if (response.data.success) {
            message.success("Password changed successfully!");
            navigate("/login");
          } else {
            message.error(response.data.message);
          }
        } else {
          message.error("Passwords do not match.");
        }
      } else {
        message.error("Incorrect OTP. Please try again.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Password reset failed. Please try again.");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  // Step 3: Resend OTP
  const handleResendOtp = async () => {
    try {
      setResendCooldown(true);
      const response = await axios.post(`${SERVER_URL}/api/email/send-otp`, {
        email,
      });
      if (response.data.success) {
        setOtp(response.data.otp); // Assuming OTP is sent back for testing
        message.success("OTP resent to your email");
      } else {
        message.error(response.data.message);
      }
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
          {otpSent ? "Verify OTP & Change Password" : "Forgot Password"}
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
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
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Confirm your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Change Password"}
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
      </div>
    </div>
  );
};

export default ForgotPassword;
