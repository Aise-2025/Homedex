import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const HomeAfterLogin = () => {
  const [lang, setLang] = useState('de');

  const content = {
    de: {
      headline: "Ihr einfacher Weg zum Immobilienverkauf mit Homedex",
      sellButton: "Immobilie verkaufen",
      buyButton: "Immobilie kaufen",
      sellInfo: "Erhalten Sie ein direktes Kaufangebot von Homedex. Beim Sofortankauf fällt eine Gebühr von 7 % des Kaufpreises an.",
      marketInfo: "Verkauf über Homedex: Keine Vor-Ort-Besichtigungen nötig. Homedex vermarktet Ihre Immobilie digital. 1 % Gebühr für Käufer und Verkäufer – keine versteckten Kosten.",
      buyInfo: "Entdecken Sie aktuelle Immobilienangebote, die bei Homedex verfügbar sind."
    },
    en: {
      headline: "Your Simple Way to Sell Real Estate with Homedex",
      sellButton: "Sell Property",
      buyButton: "Buy Property",
      sellInfo: "Receive a direct purchase offer from Homedex. A fee of 7% of the purchase price applies for immediate purchase.",
      marketInfo: "Sell through Homedex: No physical viewings required. Homedex markets your property digitally. 1% fee for buyers and sellers – no hidden costs.",
      buyInfo: "Explore the latest property listings available on Homedex."
    }
  };

  return (
    <div>
      <Navbar toggleLanguage={() => setLang(lang === 'de' ? 'en' : 'de')} currentLang={lang} />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1>{content[lang].headline}</h1>
          <div style={styles.buttonContainer}>
            <Link href="/sell">
              <a style={styles.button}>{content[lang].sellButton}</a>
            </Link>
            <Link href="/buy">
              <a style={styles.button}>{content[lang].buyButton}</a>
            </Link>
          </div>
          <div style={styles.infoContainer}>
            <p>{content[lang].sellInfo}</p>
            <p>{content[lang].marketInfo}</p>
            <p>{content[lang].buyInfo}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage: "url('https://source.unsplash.com/1600x900/?modern-house')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    paddingTop: '60px'
  },
  heroContent: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '700px',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background 0.3s',
    cursor: 'pointer'
  },
  infoContainer: {
    marginTop: '30px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: '20px',
    borderRadius: '8px',
    color: '#000'
  }
};

export default HomeAfterLogin;
