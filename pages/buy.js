import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LanguageContext } from '../context/LanguageContext';

const BuyPage = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  // Filter-Objekt für alle Felder (Beispiel, hier nur einige)
  const [filters, setFilters] = useState({
    address: '',
    country: '',
    livingArea: '',
    plotArea: '',
    availableFrom: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    garage: ''
    // Weitere Filterfelder können ergänzt werden
  });

  // Texte in beiden Sprachen für Filter und Listenüberschriften
  const texts = {
    de: {
      filtersHeader: "Immobilien filtern",
      labelAddress: "Adresse",
      placeholderStreet: "Straße, Nummer",
      placeholderPostal: "Postleitzahl, Ort",
      placeholderCountry: "Land",
      labelLivingArea: "Wohnfläche ca. (m²)",
      labelPlotArea: "Grundstück ca. (m²)",
      labelAvailableFrom: "Bezugsfrei ab",
      labelRooms: "Zimmer",
      labelBedrooms: "Schlafzimmer",
      labelBathrooms: "Badezimmer",
      labelGarage: "Garage/Stellplatz",
      listHeader: "Immobilienangebote",
      noResults: "Keine Immobilien gefunden."
    },
    en: {
      filtersHeader: "Filter Properties",
      labelAddress: "Address",
      placeholderStreet: "Street, Number",
      placeholderPostal: "Postal Code, City",
      placeholderCountry: "Country",
      labelLivingArea: "Living Area (m²)",
      labelPlotArea: "Plot Area (m²)",
      labelAvailableFrom: "Available from",
      labelRooms: "Rooms",
      labelBedrooms: "Bedrooms",
      labelBathrooms: "Bathrooms",
      labelGarage: "Garage/Parking",
      listHeader: "Property Listings",
      noResults: "No properties found."
    }
  };

  // Handler für Filteränderungen
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = properties;
    if (currentFilters.country) {
      filtered = filtered.filter((p) =>
        p.country.toLowerCase().includes(currentFilters.country.toLowerCase())
      );
    }
    if (currentFilters.address) {
      filtered = filtered.filter((p) =>
        p.address.toLowerCase().includes(currentFilters.address.toLowerCase())
      );
    }
    // Weitere Filter können hier ergänzt werden.
    setFilteredProperties(filtered);
  };

  // Beim Laden werden die Immobilien über den API-Endpunkt aus /api/sell abgerufen
  useEffect(() => {
    fetch('/api/sell')
      .then((res) => res.json())
      .then((data) => {
        const sales = Array.isArray(data) ? data : data.sales;
        // Filtern: Für BuyPage interessieren uns nur direkt verkaufte Immobilien (offerType === "angebot")
        const directSales = sales.filter((sale) => sale.offerType === 'angebot');
        setProperties(directSales);
        setFilteredProperties(directSales);
      })
      .catch((err) => console.error('Fehler beim Laden der Immobilien:', err));
  }, []);

  // Einfaches Bildkarussell zur Anzeige von Bildern (hier nutzen wir die Außenansicht)
  const PropertyCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);
    if (!images || images.length === 0) return null;
    const nextImage = () => setCurrent((current + 1) % images.length);
    const prevImage = () => setCurrent((current - 1 + images.length) % images.length);
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

  // Logout: Token löschen und zur Login-Seite weiterleiten
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <Navbar toggleLanguage={() => {}} currentLang={lang} />
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div style={styles.pageContainer}>
        {/* Filterbereich */}
        <div style={styles.filterContainer}>
          <h2>{texts[lang].filtersHeader}</h2>
          <div style={styles.filterField}>
            <label>{texts[lang].labelAddress}</label>
            <input
              type="text"
              name="address"
              value={filters.address}
              onChange={handleFilterChange}
              placeholder={`${texts[lang].placeholderStreet}, ${texts[lang].placeholderPostal}`}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].placeholderCountry}</label>
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              placeholder={texts[lang].placeholderCountry}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelLivingArea}</label>
            <input
              type="number"
              name="livingArea"
              value={filters.livingArea}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelPlotArea}</label>
            <input
              type="number"
              name="plotArea"
              value={filters.plotArea}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelAvailableFrom}</label>
            <input
              type="date"
              name="availableFrom"
              value={filters.availableFrom}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelRooms}</label>
            <input
              type="number"
              name="rooms"
              value={filters.rooms}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelBedrooms}</label>
            <input
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelBathrooms}</label>
            <input
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label>{texts[lang].labelGarage}</label>
            <input
              type="text"
              name="garage"
              value={filters.garage}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
        </div>
        {/* Listenansicht */}
        <div style={styles.listContainer}>
          <h2>{texts[lang].listHeader}</h2>
          {filteredProperties.length === 0 && <p>{texts[lang].noResults}</p>}
          {filteredProperties.map((property) => (
            <Link key={property.id} href={`/buy/${property.id}`} passHref>
              <a style={styles.propertyCard}>
                <PropertyCarousel images={property.exteriorImages || []} />
                <h3>{property.propertyDescription}</h3>
                <p>{property.country}</p>
                <p>Grundstücksgröße: {property.plotArea} m²</p>
                <p>Wohnfläche: {property.livingArea} m²</p>
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
    paddingRight: '20px',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderRight: '1px solid #ddd'
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
    flex: '3',
    paddingLeft: '20px'
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
