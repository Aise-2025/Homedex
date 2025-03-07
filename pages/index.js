import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [lang, setLang] = useState('de');

  const toggleLanguage = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const content = {
    de: {
      headline: "Homedex – Ihr smarter Immobilienpartner",
      description:
        "Mit Homedex verkaufen Sie Ihre Immobilie online – schnell, unkompliziert und fair. " +
        "Wir kaufen direkt von Ihnen und unterbreiten Ihnen ein marktgerechtes Angebot. " +
        "Falls Sie unser Angebot nicht annehmen, übernehmen wir die professionelle Vermarktung Ihrer Immobilie – ganz ohne zeitintensive Besichtigungen. " +
        "Erleben Sie den digitalen Wandel im Immobilienverkauf!"
    },
    en: {
      headline: "Homedex – Your Smart Real Estate Partner",
      description:
        "Sell your property online quickly and effortlessly with Homedex. " +
        "We buy directly from you and present you with a competitive, market-based offer. " +
        "If you choose not to accept our offer, we take care of professionally marketing your property – all without the hassle of time-consuming viewings. " +
        "Experience the digital revolution in real estate transactions!"
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
