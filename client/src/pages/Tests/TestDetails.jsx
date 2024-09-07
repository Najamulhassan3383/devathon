import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Radio, Button, message, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testSeries, setTestSeries] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const [seriesResponse, questionsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/test-series/${id}`),
          axios.get(`http://localhost:5000/api/test-series/${id}/questions`),
        ]);
        setTestSeries(seriesResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Error fetching test details:", error);
        message.error("Failed to load test details");
      }
    };

    fetchTestDetails();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the answers to your backend
      // For now, we'll just log them and show a success message
      console.log("Submitted answers:", answers);
      message.success("Test submitted successfully!");
      navigate("/tests"); // Redirect back to the tests list
    } catch (error) {
      console.error("Error submitting test:", error);
      message.error("Failed to submit test");
    }
  };

  if (!testSeries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <Title level={2}>{testSeries.test_series_name}</Title>
      <p className="mb-4">{testSeries.description}</p>
      {questions.map((question, index) => (
        <Card key={question._id} className="mb-4">
          <Title level={4}>Question {index + 1}</Title>
          <p>{question.question}</p>
          <Radio.Group
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
          >
            {question.options.map((option, optionIndex) => (
              <Radio key={optionIndex} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </Card>
      ))}
      <Button type="primary" size="large" onClick={handleSubmit}>
        Submit Test
      </Button>
    </div>
  );
};

export default TestDetails;
