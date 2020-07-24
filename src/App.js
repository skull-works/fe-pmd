import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/main';

function App() {
  return (
    <div id="page-container" className="w-full h-full m-0 p-0 bg-gray-200 grid grid-cols-1">
      <Router>
          <Routes />
      </Router>
    </div>
  );
}

export default App;
