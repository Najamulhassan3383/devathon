import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Typography, List, Tag, Divider } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Results() {
  const { state } = useLocation();
  const { id } = useParams();
  const { results } = state;
  console.log("Results", results);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <Title level={2} className="mb-4 text-center">
          Test Results
        </Title>
        <Divider />
        <div className="mb-4">
          <Text strong>Total Questions: </Text>
          <Text>{results.totalQuestions}</Text>
        </div>
        <div className="mb-4">
          <Text strong>Correct Answers: </Text>
          <Text>{results.correctAnswers}</Text>
        </div>
        <div className="mb-4">
          <Text strong>Score: </Text>
          <Text>
            {((results.correctAnswers / results.totalQuestions) * 100).toFixed(
              2
            )}
            %
          </Text>
        </div>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={results.questions}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.isCorrect ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )
                }
                title={
                  <Text strong>{`Question ${index + 1}: ${
                    item.question
                  }`}</Text>
                }
                description={
                  <>
                    <Text>Your Answer: {item.userAnswer}</Text>
                    <br />
                    <Text>Correct Answer: {item.correctAnswer}</Text>
                  </>
                }
              />
              <Tag color={item.isCorrect ? "green" : "red"}>
                {item.isCorrect ? "Correct" : "Incorrect"}
              </Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
