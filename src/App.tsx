import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import FormLibrary from './pages/FormLibrary';
import FormDataTable from './pages/FormDataTable';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form-library" element={<FormLibrary />} />
            <Route path="/data-table" element={<FormDataTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
