import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/form-library">Form Library</Link></li>
          <li><Link to="/data-table">Data Table</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
