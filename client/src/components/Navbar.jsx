import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Customer Manager</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/add" onClick={() => setIsOpen(false)}>Add Customer</Link>
        <Link to="/upload" onClick={() => setIsOpen(false)}>Upload Excel</Link>
      </div>
    </nav>
  );
}

export default Navbar;
