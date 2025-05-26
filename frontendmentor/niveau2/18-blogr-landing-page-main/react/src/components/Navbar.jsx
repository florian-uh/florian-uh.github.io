import { useState } from 'react';
import logo from '../assets/logo.svg';
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import arrowLight from '../assets/icon-arrow-light.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Pour gérer l'ouverture d'un dropdown à la fois
  const handleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="top-left">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button
        className="menu-toggle"
        aria-label="Open menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src={menuOpen ? close : hamburger} alt="" />
      </button>
      <nav className={`navbar${menuOpen ? ' open' : ''}`}>
        <ul>
          <li className={`deroulant${dropdownOpen === 0 ? ' open' : ''}`}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleDropdown(0);
              }}
            >
              Product &ensp;
            </a>
            <img src={arrowLight} alt="icon-arrow-light" />
            <ul className="sous">
              <li><a href="#">Overview</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Marketplace</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Integrations</a></li>
            </ul>
          </li>
          <li className={`deroulant${dropdownOpen === 1 ? ' open' : ''}`}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleDropdown(1);
              }}
            >
              Company &ensp;
            </a>
            <img src={arrowLight} alt="icon-arrow-light" />
            <ul className="sous">
              <li><a href="#">About</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </li>
          <li className={`deroulant${dropdownOpen === 2 ? ' open' : ''}`}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleDropdown(2);
              }}
            >
              Connect &ensp;
            </a>
            <img src={arrowLight} alt="icon-arrow-light" />
            <ul className="sous">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}