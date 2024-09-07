import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GenderDoughnutChart = () => {
  const data = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [
          { fresher: 10, graduate: 11, transfer: 24 }, //male
          { fresher: 11, graduate: 34, transfer: 23 }, //female
          { fresher: 54, graduate: 33, transfer: 2 },  //other
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const genderIndex = tooltipItem.index;
          const genderData = data.datasets[0].data[genderIndex];
          const fresher = genderData.fresher;
          const graduate = genderData.graduate;
          const transfer = genderData.transfer;
          return `Fresher: ${fresher}, Graduate: ${graduate}, Transfer: ${transfer}`;
        },
      },
    },
  };

  return <Doughnut width={100} data={data} options={options} />;
};

export default GenderDoughnutChart;
