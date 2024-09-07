import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../key";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setCookies("x-auth-token", response.data.token);
        message.success("Login successful");
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials and try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}
        <form onSubmit={handleLogin}>
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
          <div className="flex justify-between">
            {/* forgot password */}
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-600">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
