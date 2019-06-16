import React from 'react';
import './Styles/App.css';
import './Styles/right-panel.css'
import LeftPanel from './Components/LeftPanel.jsx'
import RightPanel from './Components/RightPanel.jsx'
import TopBar from './Components/TopBar.jsx'



function App() {
    return (
        <div className="App">
          <div className="dataContainer">
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
    );
}

export default App;