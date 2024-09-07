import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Tests = () => {
  const [testSeries, setTestSeries] = useState([]);

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/test-series');
        setTestSeries(response.data);
      } catch (error) {
        console.error('Error fetching test series:', error);
      }
    };

    fetchTestSeries();
  }, []);

  return (
    <div className="p-8">
      <Title level={2} className="mb-6">Available Test Series</Title>
      <Row gutter={[16, 16]}>
        {testSeries.map((test) => (
          <Col xs={24} sm={12} md={8} lg={6} key={test._id}>
            <Link to={`/tests/${test._id}`}>
              <Card
                hoverable
                className="h-full"
                cover={<div className="h-40 bg-blue-100 flex items-center justify-center">
                  <Title level={4}>{test.test_series_name}</Title>
                </div>}
              >
                <Card.Meta
                  title={test.description}
                  description={`Questions: ${test.questions.length}`}
                />
                <p className="mt-2">{test.isPaid ? `Price: $${test.price}` : 'Free'}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Tests;
