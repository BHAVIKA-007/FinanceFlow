import React from 'react';
import './SummaryCards.css';

function SummaryCards({ income, totalExpenses, budget, todaysSpending }) {
  const totalBalance = income - totalExpenses;
  const budgetLeft = budget - totalExpenses;

  return (
    <div className="summary-cards">
      <div className="card">
        <h4>Total Balance</h4>
        <p>₹{totalBalance}</p>
      </div>
      <div className="card">
        <h4>Income</h4>
        <p>₹{income}</p>
      </div>
      <div className="card">
        <h4>Total Expenses</h4>
        <p>₹{totalExpenses}</p>
      </div>
      <div className="card">
        <h4>Budget Left</h4>
        <p>₹{budgetLeft}</p>
      </div>
      <div className="card">
        <h4>Today's Spending</h4>
        <p>₹{todaysSpending}</p>
      </div>
    </div>
  );
}

export default SummaryCards;