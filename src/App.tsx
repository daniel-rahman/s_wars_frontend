import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import PeoplePage from './pages/PeoplePage';
import BackButton from './components/BackButton';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/people" element={<PeoplePage />} />
          {/* <Route path="/films" element={<><BackButton /> <h2>Films Page - Coming Soon!</h2></>} />
          <Route path="/planets" element={<><BackButton /><h2>Planets Page - Coming Soon!</h2> </>} /> */}
          <Route path="/pages" element={
            <div style={{
              display: 'flex',
              padding: '20px',
              alignItems: "center",
              width: '100%'
            }}>
              <BackButton /><h2 style={{ flexGrow: '1', textAlign: "center" }}>Page - Coming Soon!</h2>
            </div>}
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;