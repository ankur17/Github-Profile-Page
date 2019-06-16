import React from 'react';
import './App.css';
import Left from './Components/Left.jsx'
import Right from './Components/Right.jsx'
import TopBar from './Components/TopBar.jsx'



function App() {
    return (
        <div className="App">
          <TopBar />
          <div className="dataContainer">
            <Left />
            <Right />
          </div>
        </div>
    );
}

export default App;