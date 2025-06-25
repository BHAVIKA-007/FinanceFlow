import React, { useState } from 'react';
import SetupForm from './SetupForm';
import ExpenseTracker from './ExpenseTracker';

function App() {
  const [userSetup, setUserSetup] = useState(null);//data will be collected here ,intially null
  const [showSetup, setShowSetup] = useState(true);//initially we will show setup

  return (
    <div>
      {showSetup ? //if setup is true ,onComplete is a prop ,we set userdata and make it false and then expense tracker is shown which has 2 props
                  //the 2 props are usersetup that is the data and onreset function
        (<SetupForm onComplete={(data) => { setUserSetup(data);setShowSetup(false); }} />) :
        (<ExpenseTracker userSetup={userSetup}  onReset={() => setShowSetup(true)} />)}
    </div>
  );
}

export default App;