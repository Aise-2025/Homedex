import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [lang, setLang] = useState('de');

  const toggleLanguage = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const content = {
    de: {
      headline: "Homedex – Immobilien direkt online verkaufen",
      description:
        "Homedex kauft Immobilien direkt vom Verkäufer und unterbreitet ein Angebot. " +
        "Der Käufer kann das Angebot annehmen oder zurückstellen – in diesem Fall vermarktet Homedex das Haus. " +
        "Unser Ziel: Immobilien online zu vermarkten, ganz ohne Besichtigung, falls der Verkäufer das Angebot nicht annimmt."
    },
    en: {
      headline: "Homedex – Sell Your Property Online Directly",
      description:
        "Homedex buys properties directly from the seller and makes an offer. " +
        "The buyer can accept the offer or postpone it – in which case Homedex will market the property. " +
        "Our goal: to market properties online without physical viewings if the seller does not accept the offer."
    }
  };

  return (
    <div>
      <Navbar toggleLanguage={toggleLanguage} currentLang={lang} />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1>{content[lang].headline}</h1>
          <p>{content[lang].description}</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage: "url('https://source.unsplash.com/1600x900/?realestate,house')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    paddingTop: '60px' // Damit die fixe Navbar nicht überlappt
  },
  heroContent: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    textAlign: 'center'
  }
};

export default HomePage;

