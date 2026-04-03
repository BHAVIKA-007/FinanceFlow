import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart({ expenseList }) {
  // Group expenses by category
  const categoryData = expenseList.reduce((acc, expense) => {
    const category = expense.Category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.Amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed}`;
          }
        }
      }
    },
  };

  return (
    <div className="pie-chart">
      <h3>Expenses by Category</h3>
      <div style={{ height: '250px', width: '100%' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoryPieChart;