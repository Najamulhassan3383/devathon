import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Radio,
  Button,
  message,
  Typography,
  Layout,
  Space,
  Progress,
  Divider,
  Modal,
  Input,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Chat from "./Chat";
import { useCookies } from "react-cookie"; // Import useCookies to retrieve the token
import { useUser } from "../../context/UserContext";

const { Title, Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

export default function TestDetails({ socket }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testSeries, setTestSeries] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false); // Modal for posting discussion
  const [discussionText, setDiscussionText] = useState(''); // Store discussion input
  const [cookies] = useCookies(['x-auth-token']); // Retrieve the token from cookies
  const token = cookies['x-auth-token']; // Store the token
  const { isUser } = useUser();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const [seriesResponse, questionsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/test-series/${id}`, {
            headers: {
              'x-auth-token': token, // Pass the token for authentication
            },
          }),
          axios.get(`http://localhost:5000/api/test-series/${id}/questions`, {
            headers: {
              'x-auth-token': token, // Pass the token for authentication
            },
          }),
        ]);
        setTestSeries(seriesResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Error fetching test details:", error);
        message.error("Failed to load test details");
      }
    };

    fetchTestDetails();
  }, [id, token]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/test-series/${id}/submit`,
        { answers },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      message.success("Test submitted successfully!");
      navigate(`/tests/${id}/results`, { state: { results: response.data.results } });
    } catch (error) {
      console.error("Error submitting test:", error);
      message.error("Failed to submit test");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handlePostDiscussion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/test-series/discussion/${id}`,
        { discussion: discussionText }, // Send discussion text
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      message.success("Discussion posted successfully!");
      setIsDiscussionModalOpen(false); // Close modal
      setDiscussionText(''); // Reset input
    } catch (error) {
      console.error("Error posting discussion:", error);
      message.error("Failed to post discussion");
    }
  };

  if (!testSeries) {
    return (
      <Layout className="min-h-screen bg-gray-100">
        <Content className="p-8">
          <Card loading={true} />
        </Content>
      </Layout>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <Space direction="vertical" size="large" className="w-full">
            <div className="flex justify-between items-center">
              <Title level={2} className="mb-2 text-blue-800">
                {testSeries.test_series_name}
              </Title>
            </div>
            <Text type="secondary">{testSeries.description}</Text>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={() => setIsChatOpen(true)}
              className="bg-black"
            >
              Open Chat
            </Button>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={() => setIsDiscussionModalOpen(true)} // Open modal for discussion
              className="bg-black"
            >
              Post Discussion
            </Button>

            <Divider />

            <Space className="w-full justify-between">
              <Text strong>
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <Space>
                <ClockCircleOutlined /> <Text>Time remaining: 45:00</Text>
              </Space>
            </Space>

            <Progress
              percent={((currentQuestion + 1) / questions.length) * 100}
              showInfo={false}
              strokeColor="#1890ff"
              trailColor="#f0f0f0"
            />

            {currentQuestionData && (
              <Card className="bg-gray-50">
                <Title level={4} className="mb-4">
                  {currentQuestionData.question}
                </Title>
                <Radio.Group
                  onChange={(e) =>
                    handleAnswerChange(currentQuestionData._id, e.target.value)
                  }
                  value={answers[currentQuestionData._id]}
                  className="w-full"
                >
                  <Space direction="vertical" className="w-full">
                    {currentQuestionData.options.map((option, optionIndex) => (
                      <Radio
                        key={optionIndex}
                        value={option}
                        className="w-full py-2 px-4 border rounded hover:bg-gray-100"
                      >
                        {option}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Card>
            )}

            <Space className="w-full justify-between">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button className="bg-blue-600" type="primary" onClick={handleNextQuestion}>
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={handleSubmit}
                >
                  Submit Test
                </Button>
              )}
            </Space>
          </Space>
        </Card>
      </Content>

      <Modal
        title="Test Chat"
        visible={isChatOpen}
        onCancel={() => setIsChatOpen(false)}
        footer={null}
        width={600}
      >
        <Chat socket={socket} testId={id} teacherID={testSeries.teachersID._id} studentID={isUser._id} />
      </Modal>

      <Modal
        title="Post a Discussion"
        visible={isDiscussionModalOpen} // Modal visibility for discussion
        onCancel={() => setIsDiscussionModalOpen(false)} // Close modal on cancel
        footer={[
          <Button key="back" onClick={() => setIsDiscussionModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handlePostDiscussion}>
            Post
          </Button>,
        ]}
      >
        <TextArea
          rows={4}
          value={discussionText} // Controlled input for discussion text
          onChange={(e) => setDiscussionText(e.target.value)} // Handle input change
          placeholder="Write your discussion here..."
        />
      </Modal>
    </Layout>
  );
}
