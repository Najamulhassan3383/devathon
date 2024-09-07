import React, { useState } from "react";
import {
  Upload,
  Button,
  message,
  Typography,
  Input,
  Switch,
  InputNumber,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import axios from "axios";
import { useCookies } from "react-cookie";

const { Title, Text } = Typography;

const CreateTestSeries = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["x-auth-token"]);
  const [file, setFile] = useState(null);
  const [testSeriesName, setTestSeriesName] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(0);

  // Handle file selection, but prevent immediate upload
  const handleFileUpload = (info) => {
    const selectedFile = info.file;
    setFile(selectedFile); // Store the file for processing later
    message.success(`${selectedFile.name} file selected.`);
  };

  const processCSV = (csvData) => {
    const questions = csvData.data.map((row) => ({
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4],
      correct_answers: row.correct_answer,
      subject: row.subject,
    }));
    return questions;
  };

  const handleSubmit = async () => {
    if (!file || !testSeriesName) {
      message.error("Please upload a CSV file and provide a test series name.");
      return;
    }

    try {
      // Use Papa.parse to process the CSV file
      const result = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          complete: resolve,
          error: reject,
        });
      });

      const questions = processCSV(result);

      const testSeriesData = {
        test_series_name: testSeriesName,
        description,
        questions,
        isPaid,
        price: isPaid ? price : 0,
      };

      // Submit the test series data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/test-series/addTestSeries",
        testSeriesData,
        {
          headers: {
            "x-auth-token": cookies["x-auth-token"],
          },
        }
      );
      message.success("Test series created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating test series:", error);
      message.error("Failed to create test series. Please try again.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6">
      <Title level={2}>Create New Test Series</Title>
      <Input
        placeholder="Test Series Name"
        value={testSeriesName}
        onChange={(e) => setTestSeriesName(e.target.value)}
        className="mb-4"
      />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <Text>Is Paid?</Text>
        <Switch checked={isPaid} onChange={setIsPaid} className="ml-2" />
      </div>
      {isPaid && (
        <InputNumber
          min={0}
          value={price}
          onChange={setPrice}
          formatter={(value) => `$ ${value}`}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          className="mb-4"
        />
      )}
      <Upload
        accept=".csv"
        beforeUpload={() => false} // Prevent automatic upload
        onChange={handleFileUpload} // Handle manual upload
      >
        <Button icon={<UploadOutlined />}>Click to Select CSV</Button>
      </Upload>
      <Text type="secondary" className="block mt-2 mb-4">
        Please upload a CSV file with the following columns: question, option1,
        option2, option3, option4, correct_answer, subject
      </Text>
      <Button type="primary" onClick={handleSubmit} className="mt-4">
        Create Test Series
      </Button>
      <Card className="mt-4">
        <Title level={4}>Sample CSV Format:</Title>
        <pre>
          {`question,option1,option2,option3,option4,correct_answer,subject
What is the capital of France?,London,Berlin,Paris,Madrid,Paris,geography
Which planet is known as the Red Planet?,Earth,Mars,Jupiter,Venus,Mars,science`}
        </pre>
      </Card>
    </Card>
  );
};

export default CreateTestSeries;
