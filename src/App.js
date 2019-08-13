import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import AppHeader from './component/AppHeader';
import DailyReadings from './component/DailyReading';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <BrowserRouter>
      <Switch>
        {/* <Route path="/CatholicPrayers" Component={}/> */}
         <Route path="/DailyReadings"  component={DailyReadings}/>
        <Route  path="/" exact  component={DailyReadings}/>
        {/* <Route path="/Knowyourfaith" Component={}/> */}
        {/* <Route path="/SaintofTheday" Component={}/> */}
      </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
