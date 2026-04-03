import './ExpenseTracker.css';
import React, {useState} from 'react';
import SummaryCards from './SummaryCards';
import CategoryPieChart from './PieChart';
import ExpensesOverTime from './LineChart';
import './SummaryCards.css';

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
const [searchTerm, setSearchTerm] = useState('');
const [filterCategory, setFilterCategory] = useState('');
const [filterDateFrom, setFilterDateFrom] = useState('');
const [filterDateTo, setFilterDateTo] = useState('');
const [sortBy, setSortBy] = useState('date-desc');

// Filter and sort expenses
const getFilteredAndSortedExpenses = () => {
  let filtered = expenseList.filter(exp => {
    const matchesSearch = exp.Description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.Amount.toString().includes(searchTerm);
    const matchesCategory = filterCategory === '' || exp.Category === filterCategory;
    const matchesDateFrom = filterDateFrom === '' || exp.Date >= filterDateFrom;
    const matchesDateTo = filterDateTo === '' || exp.Date <= filterDateTo;
    return matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo;
  });

  // Sort
  filtered.sort((a, b) => {
    switch(sortBy) {
      case 'date-asc':
        return new Date(a.Date) - new Date(b.Date);
      case 'date-desc':
        return new Date(b.Date) - new Date(a.Date);
      case 'amount-asc':
        return a.Amount - b.Amount;
      case 'amount-desc':
        return b.Amount - a.Amount;
      case 'category-asc':
        return a.Category.localeCompare(b.Category);
      case 'category-desc':
        return b.Category.localeCompare(a.Category);
      default:
        return 0;
    }
  });

  return filtered;
};

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
      Date: new Date().toISOString().split('T')[0]
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
    <SummaryCards income={props.userSetup.income} totalExpenses={totalexp} budget={props.userSetup.budget} todaysSpending={spendingtoday} />

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
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setExpense({ ...expense, Date: e.target.value })} 
          />
        </div>
      </div>
      
      <button type="submit" className="submit-btn" onClick={(e)=>updateExpense(e)}>
        Add Expense
      </button>
    </form>

    <div className="charts-container">
      <CategoryPieChart expenseList={expenseList} />
      <ExpensesOverTime expenseList={expenseList} />
    </div>

    <div className="filter-controls">
      <div className="filter-group">
        <input 
          type="text" 
          placeholder="Search by description or amount"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          {categories.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>From Date:</label>
        <input 
          type="date" 
          value={filterDateFrom}
          onChange={(e) => setFilterDateFrom(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>To Date:</label>
        <input 
          type="date" 
          value={filterDateTo}
          onChange={(e) => setFilterDateTo(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
          <option value="category-asc">Category (A-Z)</option>
          <option value="category-desc">Category (Z-A)</option>
        </select>
      </div>
    </div>

    <div className="expense-history">
      <h3>Expense History</h3>
      {expenseList.length === 0 ? (
        <div className="empty-state">
          <p>No expenses recorded yet. Add your first expense above!</p>
        </div>
      ) : (
        <>
          {getFilteredAndSortedExpenses().length === 0 ? (
            <div className="empty-state">
              <p>No transactions match your search/filter criteria.</p>
            </div>
          ) : (
            <ul className="expense-list">
              {getFilteredAndSortedExpenses().map((exp, index) => (
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
        </>
      )}
      
      <div className="total-expense">
        <p>Your Total Expense is ₹{totalexp}</p>
      </div>
    </div>
  </div>
)
 
}
export default ExpenseTracker;