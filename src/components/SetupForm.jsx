import './SetupForm.css';
import React,{useState}from "react";

function SetupForm(props){
const [income,setincome]=useState(0);
const [budget,setbudget]=useState(0);
const [currmonth,setcurrmonth]=useState("");
const [goal,setgoal]=useState("");
const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

function updateincome(e){
setincome(Number(e.target.value));
}
function updatebudget(e){
setbudget(Number(e.target.value));
}
function updatemonth(e){
setcurrmonth(e.target.value);
}
function updategoal(e){
setgoal(e.target.value);
}

function updateonsbm(e){
  e.preventDefault(); 
  // collceting current values in an obj and passing them
  const setupData = {
    income: income,
    budget: budget,
    month: currmonth,
    goal: goal
  };
  props.onComplete(setupData); 
  
}

return(
<div id="setup">
    <h2>Setup Your Financial Goals</h2>
  <form id="form">
    <input 
      type="number" 
      id="in" 
      onChange={(e)=>updateincome(e)} 
      placeholder="Enter your monthly income (₹)"
      min="0"
    />
    
    <input 
      type="number" 
      id="bdg" 
      onChange={(e)=>updatebudget(e)} 
      placeholder="Set your monthly budget (₹)"
      min="0"
    />
    
    <select value={currmonth} onChange={(e)=>updatemonth(e)}>
      <option value="">Select current month</option>
      {months.map((month, index) => (
        <option key={index} value={month}>{month}</option>
      ))}
    </select>

    <div className="goals-section">
      <div className="goals-title">What's your primary financial goal?</div>
      <div className="goals-container">
        <label className="goal">
          <input 
            type="radio" 
            name="goal" 
            value="save money" 
            onChange={(e) => updategoal(e)} 
            checked={goal === "save money"}
          />
          💰 Save Money
        </label>
        
        <label className="goal">
          <input 
            type="radio" 
            name="goal" 
            value="track expenses" 
            onChange={(e) => updategoal(e)} 
            checked={goal === "track expenses"}
          />
          📊 Track Expenses
        </label>
        
        <label className="goal">
          <input 
            type="radio" 
            name="goal" 
            value="reduce unnecessary spending" 
            onChange={(e) => updategoal(e)} 
            checked={goal === "reduce unnecessary spending"}
          />
          ✂️ Reduce Unnecessary Spending
        </label>
        
        <label className="goal">
          <input 
            type="radio" 
            name="goal" 
            value="build emergency fund" 
            onChange={(e) => updategoal(e)} 
            checked={goal === "build emergency fund"}
          />
          🛡️ Build Emergency Fund
        </label>
        
        <label className="goal">
          <input 
            type="radio" 
            name="goal" 
            value="plan for future trip" 
            onChange={(e) => updategoal(e)} 
            checked={goal === "plan for future trip"}
          />
          ✈️ Plan for Future Trip
        </label>
      </div>
    </div>

    <button type="submit" onClick={updateonsbm}>
      Start Tracking
    </button>
 </form>
</div>
);

}
export default SetupForm;