import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import CreateTestSeries from "./CreateTestSeries";
import { useCookies } from "react-cookie";

const { Title, Text } = Typography;

export default function TeacherTestSeriesList() {
  const [testSeries, setTestSeries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["x-auth-token"]);

  useEffect(() => {
    fetchTestSeries();
  }, []);

  const fetchTestSeries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/test-series/teacher",
        {
          headers: {
            "x-auth-token": cookies["x-auth-token"],
          },
        }
      );
      setTestSeries(response.data.testSeries);
    } catch (error) {
      console.error("Error fetching test series:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateSuccess = () => {
    setIsModalVisible(false);
    fetchTestSeries(); // Refresh the list after creating a new test series
  };

  return (
    <div className="p-8 bg-gray-100 h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-blue-800">
          Your Test Series
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
        >
          Create New Test Series
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        {testSeries.length === 0 && <div>
          <div className="text-center text-gray-500">No Test Series Found</div>
        </div>}
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
                  <Text strong className="block mb-2">
                    Enrolled Students: {test.joinedBy.length}
                  </Text>
                  <Text className="text-lg font-semibold text-blue-600 block mb-4">
                    {test.isPaid ? `Price: $${test.price}` : "Free"}
                  </Text>
                  <div className="flex justify-between items-center">
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Create New Test Series"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <CreateTestSeries onSuccess={handleCreateSuccess} />
      </Modal>
    </div>
  );
}
