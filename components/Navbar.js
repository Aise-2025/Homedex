import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ toggleLanguage, currentLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  // Texte für die Navigation in Deutsch und Englisch
  const navText = {
    de: {
      login: "Login",
      kundenbewertungen: "Kundenbewertungen",
      ueberHomedex: "Über Homedex",
      impressum: "Impressum",
    },
    en: {
      login: "Login",
      kundenbewertungen: "Customer Reviews",
      ueberHomedex: "About Homedex",
      impressum: "Imprint",
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/">
          <a style={styles.link}>Homedex</a>
        </Link>
      </div>
      <div style={styles.hamburger} onClick={handleMenuToggle}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>
      <ul style={{ ...styles.navLinks, ...(menuOpen ? styles.navLinksOpen : {}) }}>
        <li>
          <Link href="/login">
            <a style={styles.link}>{navText[currentLang].login}</a>
          </Link>
        </li>
        <li>
          <Link href="/kundenbewertungen">
            <a style={styles.link}>{navText[currentLang].kundenbewertungen}</a>
          </Link>
        </li>
        <li>
          <Link href="/ueber-homedex">
            <a style={styles.link}>{navText[currentLang].ueberHomedex}</a>
          </Link>
        </li>
        <li>
          <Link href="/impressum">
            <a style={styles.link}>{navText[currentLang].impressum}</a>
          </Link>
        </li>
        <li>
          <button onClick={toggleLanguage} style={styles.langButton}>
            {currentLang === 'de' ? 'EN' : 'DE'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold'
  },
  hamburger: {
    display: 'block',
    cursor: 'pointer',
    width: '25px'
  },
  bar: {
    height: '3px',
    width: '100%',
    backgroundColor: '#333',
    margin: '4px 0'
  },
  navLinks: {
    listStyle: 'none',
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  navLinksOpen: {
    display: 'flex'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    padding: '10px 15px'
  },
  langButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    color: '#333'
  }
};

export default Navbar;
