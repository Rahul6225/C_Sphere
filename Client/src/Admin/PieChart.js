import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = (props) => {
  const { attendance } = props;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (attendance) {
      setChartData(attendance);
    }
   
  }, [attendance]);


  
    const pieChartData = {
        labels: ['attended','delivered'],
        datasets: [
        {
            label: 'Attendance',
            data: [attendance?.attended === undefined ? 0 : attendance.attended, attendance?.delivered === undefined ? 0 : attendance.delivered],
            backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            ],
            hoverOffset: 4,
        },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Attendance',
          },
        },
      }
  return (
    
    <div style={{ width: '350px', height: '370px' }}>
      <Pie data={pieChartData} options={options} />
    </div>
  );
}

export default PieChart;