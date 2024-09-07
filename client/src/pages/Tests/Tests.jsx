import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

export default function Tests() {
  const [testSeries, setTestSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/test-series"
        );
        setTestSeries(response.data);
      } catch (error) {
        console.error("Error fetching test series:", error);
        message.error("Failed to load test series. Please try again later.");
      }
    };

    fetchTestSeries();
  }, []);

  const handleJoin = (testId) => {
    console.log(testId);
    // Replace this with your actual API call to join a test series
    // await axios.post(`http://localhost:5000/api/test-series/${testId}/join`);
    // message.success("Successfully joined the test series!");
    navigate(`/tests/${testId}`);
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
                  src={`https://source.unsplash.com/400x200/?exam,test,education&sig=${test._id}`}
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
                    <Button
                      type="primary"
                      onClick={() => handleJoin(test._id)}
                      className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                    >
                      Join Now
                    </Button>
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
