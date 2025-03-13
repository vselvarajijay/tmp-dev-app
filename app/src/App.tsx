import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
