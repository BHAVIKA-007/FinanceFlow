import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ExpensesOverTime({ expenseList }) {
  // Group expenses by date
  const dateData = expenseList.reduce((acc, expense) => {
    const date = expense.Date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.Amount;
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(dateData).sort();
  const amounts = sortedDates.map(date => dateData[date]);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Expenses',
        data: amounts,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y}`;
          }
        }
      }
    },
  };

  return (
    <div className="line-chart">
      <h3>Expenses Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default ExpensesOverTime;