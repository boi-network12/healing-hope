import React from 'react';
import { Line } from 'react-chartjs-2';
import { Timestamp } from 'firebase/firestore';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import "./Chart.css"

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ users }) => {
  // Process user data to count registrations per month
  const countUsersPerMonth = (users) => {
    const monthCounts = {};
    users.forEach(user => {
      const date = user.createdAt instanceof Timestamp ? user.createdAt.toDate() : new Date(user.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthYear = `${year}-${month + 1}`;

      if (monthCounts[monthYear]) {
        monthCounts[monthYear]++;
      } else {
        monthCounts[monthYear] = 1;
      }
    });
    return monthCounts;
  };

  const userCountsPerMonth = countUsersPerMonth(users);
  const sortedMonths = Object.keys(userCountsPerMonth).sort();
  const userCounts = sortedMonths.map(month => userCountsPerMonth[month]);

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'User Registrations',
        data: userCounts,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of Registrations'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'User Data Analysis Chart'
      },
      tooltip: {
        enabled: true
      },
      legend: {
        display: true
      }
    }
  };

  return (
    <div className='chartWrapper'>
      <h2>User Data Analysis Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
