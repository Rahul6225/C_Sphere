import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const { score } = props;
  const [chartData, setChartData] = useState([]);

  // Use useEffect to update state only when `score` changes
  useEffect(() => {
    if (score) {
      setChartData(score);
    }
  }, [score]);

  const barChartData = {
    labels: ["Web-Dev", "AI_ML", "C++"],
    datasets: [
      {
        label: "Marks",
        data: chartData.map((score) => score === null ? 0 : score), // Replace `null` with `0`,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Color for Web-Dev
          "rgba(54, 162, 235, 0.6)", // Color for AI_ML
          "rgba(75, 192, 192, 0.6)", // Color for C++
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Border for Web-Dev
          "rgba(54, 162, 235, 1)", // Border for AI_ML
          "rgba(75, 192, 192, 1)", // Border for C++
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Marks Distribution' },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Subjects', // X-axis title
          font: {
            size: 14,
            family: 'Arial',
          },
          color: '#333', // Title color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Marks', // Y-axis title
          font: {
            size: 14,
            family: 'Arial',
          },
          color: '#333', // Title color
        },
        ticks: {
          stepSize: 1, // Optional: Set a step size for better readability
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default BarChart;
