import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RightOutlined } from "@ant-design/icons";
import { useCookies } from 'react-cookie';

const { Title, Text } = Typography;

export default function Tests() {
  const [testSeries, setTestSeries] = useState([]);
  const [cookies] = useCookies(['x-auth-token']); // Extract token from cookies
  const token = cookies['x-auth-token']; // Assuming the token is stored here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/test-series", 
          {
            headers: {
              'x-auth-token': token, // Pass token for authentication
            }
          }
        );
        setTestSeries(response.data);
      } catch (error) {
        console.error("Error fetching test series:", error);
        message.error("Failed to load test series. Please try again later.");
      }
    };

    fetchTestSeries();
  }, [token]);

  const handleJoin = async (testId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/test-series/enrollInTestSeries/${testId}`, {
        headers: {
          'x-auth-token': token, // Send the token for authentication
        }
      });
      message.success(response.data.message); // Show success message
      navigate(`/tests/${testId}`); // Navigate to the test details page
    } catch (error) {
      console.error("Error enrolling in test series:", error);
      message.error(error.response?.data?.message || "Failed to join the test series.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-6 text-center text-blue-800">
        Available Test Series
      </Title>
      <Row gutter={[16, 16]}>
        {testSeries.map((test) => (
          <Col xs={24} sm={12} md={8} lg={6} key={test._id}>
            <Card
              hoverable
              className="h-full shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
              cover={
                <img
                  alt={test.test_series_name}
                  src={`https://placehold.co/200x200`}
                  className="h-48 object-cover"
                />
              }
            >
              <div className="flex flex-col flex-grow">
                <Title level={4} className="mb-2">
                  {test.test_series_name}
                </Title>
                <Text className="text-gray-600 mb-2 flex-grow">
                  {test.description}
                </Text>
                <div className="mt-auto">
                  <Text strong className="block mb-2">
                    Questions: {test.questions.length}
                  </Text>
                  <Text className="text-lg font-semibold text-blue-600 block mb-4">
                    {test.isPaid ? `Price: $${test.price}` : "Free"}
                  </Text>
                  <div className="flex justify-between items-center">
                    <Link to={`/tests/${test._id}`}>
                      <Button type="link" className="p-0 flex items-center">
                        Details <RightOutlined />
                      </Button>
                    </Link>
                    {test.isJoined ? (
                      <Button
                        type="primary"
                        onClick={() => navigate(`/tests/${test._id}`)} // Navigate to test details
                        className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                      >
                        Go
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => handleJoin(test._id)} // Call handleJoin when the button is clicked
                        className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                      >
                        Join Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
