import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageContext } from '../context/LanguageContext';

const BuyPage = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    minPrice: '',
    maxPrice: ''
  });

  // Beim Laden werden die Immobilien aus dem Backend (db.json via /api/sell) geholt
  useEffect(() => {
    fetch('/api/sell')
      .then((res) => res.json())
      .then((data) => {
        // Falls das Backend ein Objekt mit "sales" liefert, ansonsten direkt das Array
        const sales = Array.isArray(data) ? data : data.sales;
        setProperties(sales);
        setFilteredProperties(sales);
      })
      .catch((err) => console.error('Fehler beim Laden der Immobilien:', err));
  }, []);

  // Filter-Handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filterProperties(newFilters);
  };

  const filterProperties = (currentFilters) => {
    let filtered = properties;
    if (currentFilters.country) {
      filtered = filtered.filter((p) =>
        p.country.toLowerCase().includes(currentFilters.country.toLowerCase())
      );
    }
    if (currentFilters.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(currentFilters.minPrice));
    }
    if (currentFilters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(currentFilters.maxPrice));
    }
    setFilteredProperties(filtered);
  };

  // Einfaches Bildkarussell für jeden Immobilieneintrag
  const PropertyCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);
    if (!images || images.length === 0) return null;

    const nextImage = () => {
      setCurrent((current + 1) % images.length);
    };

    const prevImage = () => {
      setCurrent((current - 1 + images.length) % images.length);
    };

    return (
      <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
        <img
          src={images[current]}
          alt={`Image ${current + 1}`}
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} style={carouselButtonStyles.left}>◀</button>
            <button onClick={nextImage} style={carouselButtonStyles.right}>▶</button>
          </>
        )}
      </div>
    );
  };

  const carouselButtonStyles = {
    left: {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      padding: '5px'
    },
    right: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      padding: '5px'
    }
  };

  // Texte in beiden Sprachen
  const texts = {
    de: {
      filters: "Filter",
      country: "Land",
      minPrice: "Mindestpreis",
      maxPrice: "Höchstpreis",
      listHeader: "Immobilienangebote",
      noResults: "Keine Immobilien gefunden."
    },
    en: {
      filters: "Filters",
      country: "Country",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      listHeader: "Property Listings",
      noResults: "No properties found."
    }
  };

  // Logout: Token löschen und Weiterleitung zur Login-Seite
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <Navbar toggleLanguage={() => {}} currentLang={lang} />
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div style={styles.pageContainer}>
        {/* Linker Filterbereich */}
        <div style={styles.filterContainer}>
          <h2>{texts[lang].filters}</h2>
          <div style={styles.filterField}>
            <label>{texts[lang].country}</label>
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].minPrice}</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].maxPrice}</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
        </div>
        {/* Rechte Listenansicht */}
        <div style={styles.listContainer}>
          <h2>{texts[lang].listHeader}</h2>
          {filteredProperties.length === 0 && <p>{texts[lang].noResults}</p>}
          {filteredProperties.map((property) => (
            <Link key={property.id} href={`/buy/${property.id}`}>
              <a style={styles.propertyCard}>
                <PropertyCarousel images={property.images} />
                <h3>{property.description}</h3>
                <p>{property.country}</p>
                <p>Grundstücksgröße: {property.plotSize} m²</p>
                <p>Wohnfläche: {property.livingSpace} m²</p>
                <p>Preis: €{property.price}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  pageContainer: {
    display: 'flex',
    padding: '20px',
    marginTop: '60px'
  },
  filterContainer: {
    flex: '1',
    paddingRight: '20px'
  },
  filterField: {
    marginBottom: '15px'
  },
  filterInput: {
    width: '100%',
    padding: '8px',
    marginTop: '5px'
  },
  listContainer: {
    flex: '3'
  },
  propertyCard: {
    display: 'block',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '10px',
    textDecoration: 'none',
    color: '#000'
  }
};

export default BuyPage;
