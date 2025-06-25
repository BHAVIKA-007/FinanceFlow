import './ExpenseTracker.css';
import React, { useState, useEffect } from 'react';

function ExpenseTracker(props){
const [expense, setExpense] = useState({
                                        Amount:0,
                                        Category:"",
                                        Description:"",
                                        Date:new Date().toISOString().split('T')[0]
//Creates a new Date object representing the current date and time right now.
//Converts the Date to a standard ISO format string like
//Splits the ISO string into two parts:["2025-06-25", "04:45:30.000Z"] — separates date and time at the 'T'
//Selects the first part of the split result, which is the date only:"2025-06-25"
});
const [expenseList, setExpenseList] = useState([]);
const categories=["food","education","travel","entertainment","other"];
const [totalexp,settotalexp]=useState(0);
const [spendingtoday,setspendingtoday]=useState(0);

function updateAmount(e){
  setExpense({ ...expense, Amount: Number(e.target.value) })
}
function updatecategory(e){
  setExpense({ ...expense, Category:e.target.value})
}
function updateDescription(e){
setExpense({ ...expense,Description:e.target.value})
}

 function updateExpense(e) {
   e.preventDefault(); 
    settotalexp(prev => prev + Number(expense.Amount));
  //if expense date=todays date
    if (expense.Date === new Date().toISOString().split('T')[0]) {
      setspendingtoday(prev => prev +Number(expense.Amount));
    }
    // Add to expense list
    setExpenseList(prevList => [...prevList, expense]);

    alert(`You can still spend ₹${props.userSetup.budget - (totalexp + Number(expense.Amount))} this month.`);

    // Reset form
    setExpense({
      Amount: 0,
      Category: '',
      Description: '',
      Date: new Date().toLocaleDateString()
      //Converts the date into a localized date string, based on the user's browser language and region.
      //In India (en-IN): "25/6/2025" and In US (en-US): "6/25/2025"
    });
  }

return(
  <div className="expense-tracker">
    <div className="header">
      <h2>Expense Tracker</h2>
      <div className="budget-info">
        Welcome! Budget: ₹{props.userSetup.budget} | Goal: {props.userSetup.goal}
      </div>
    </div>
    
    <div className="summary">
      <h3>Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">Today's Spending</div>
          <div className="value">₹{spendingtoday}</div>
        </div>
        <div className="summary-item">
          <div className="label">Total Expenses</div>
          <div className="value">₹{totalexp}</div>
        </div>
      </div>
    </div>

    <form className="expense-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Amount</label>
          <input 
            type="number" 
            value={expense.Amount === 0 ? '' : expense.Amount} 
            onChange={(e)=>updateAmount(e)} 
            placeholder="Enter amount"
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            value={expense.Category}
            onChange={(e) =>updatecategory(e)}
          >
            <option value="">Select Category</option>
            {categories.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            value={expense.Description} 
            onChange={(e)=>updateDescription(e)} 
            placeholder="Enter Description"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            value={expense.Date} 
            onChange={(e) => setExpense({ ...expense, Date: e.target.value })} 
          />
        </div>
      </div>
      
      <button type="submit" className="submit-btn" onClick={(e)=>updateExpense(e)}>
        Add Expense
      </button>
    </form>

    <div className="expense-history">
      <h3>Expense History</h3>
      {expenseList.length === 0 ? (
        <div className="empty-state">
          <p>No expenses recorded yet. Add your first expense above!</p>
        </div>
      ) : (
        <ul className="expense-list">
          {expenseList.map((exp, index) => (
            <li key={index} className="expense-item">
              <div className="expense-details">
                <div className="expense-amount">₹{exp.Amount}</div>
                <div className="expense-category">{exp.Category}</div>
                <div className="expense-description">{exp.Description}</div>
                <div className="expense-date">{exp.Date}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="total-expense">
        <p>Your Total Expense is ₹{totalexp}</p>
      </div>
    </div>
  </div>
)
 
}
export default ExpenseTracker;