import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { LanguageContext } from '../context/LanguageContext';

const SellPage = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();

  // Textfelder
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [condition, setCondition] = useState('');
  const [rooms, setRooms] = useState('');
  const [water, setWater] = useState('');
  const [electricity, setElectricity] = useState('');

  // Einzelbilder (als Objekte mit File und Preview)
  const [countryImage, setCountryImage] = useState(null);
  const [addressImage, setAddressImage] = useState(null);
  const [yearBuiltImage, setYearBuiltImage] = useState(null);
  const [conditionImage, setConditionImage] = useState(null);
  const [roomsImage, setRoomsImage] = useState(null);
  const [waterImage, setWaterImage] = useState(null);
  const [electricityImage, setElectricityImage] = useState(null);

  // Mehrfachbilder
  const [roofImages, setRoofImages] = useState([]);
  const [facadeImages, setFacadeImages] = useState([]);

  // Angebotsart
  const [offerType, setOfferType] = useState('');

  // Texte in beiden Sprachen
  const content = {
    de: {
      headline: "Immobilie verkaufen",
      formLabels: {
        country: "Land",
        address: "Adresse",
        yearBuilt: "Baujahr",
        condition: "Zustand",
        rooms: "Anzahl Zimmer",
        water: "Wasser (Neu/Alt)",
        electricity: "Elektrizität (Jahr)"
      },
      fileLabels: {
        country: "Bild für Land",
        address: "Bild für Adresse",
        yearBuilt: "Bild für Baujahr",
        condition: "Bild für Zustand",
        rooms: "Bild für Zimmer",
        water: "Bild für Wasser",
        electricity: "Bild für Elektrizität",
        roof: "Bilder für Dach (max. 2)",
        facade: "Bilder für Fassade (max. 4)"
      },
      buttons: {
        angebot: "Angebot",
        vermarktung: "Vermarktung"
      },
      explanation: "Angebot: 7 % des Verkaufspreises. Vermarktung: 1 % für Käufer und Verkäufer vom Verkaufspreis."
    },
    en: {
      headline: "Sell Your Property",
      formLabels: {
        country: "Country",
        address: "Address",
        yearBuilt: "Year Built",
        condition: "Condition",
        rooms: "Number of Rooms",
        water: "Water (New/Old)",
        electricity: "Electricity (Year)"
      },
      fileLabels: {
        country: "Image for Country",
        address: "Image for Address",
        yearBuilt: "Image for Year Built",
        condition: "Image for Condition",
        rooms: "Image for Rooms",
        water: "Image for Water",
        electricity: "Image for Electricity",
        roof: "Images for Roof (max. 2)",
        facade: "Images for Facade (max. 4)"
      },
      buttons: {
        angebot: "Offer",
        vermarktung: "Marketing"
      },
      explanation: "Offer: 7% of the sale price. Marketing: 1% fee for both buyer and seller from the sale price."
    }
  };

  // Handler für einzelne Bild-Uploads
  const handleSingleImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter({ file, preview: URL.createObjectURL(file) });
    }
  };

  // Handler für Mehrfachbild-Uploads
  const handleMultipleImageChange = (e, setter, maxCount) => {
    const files = Array.from(e.target.files).slice(0, maxCount);
    const images = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setter(images);
  };

  // Beim Absenden werden die Daten als JSON an den API-Endpoint gesendet.
  // Für Bilder senden wir hier als MVP lediglich die generierten Preview-URLs.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = {
      country,
      address,
      yearBuilt,
      condition,
      rooms,
      water,
      electricity,
      countryImage: countryImage ? countryImage.preview : null,
      addressImage: addressImage ? addressImage.preview : null,
      yearBuiltImage: yearBuiltImage ? yearBuiltImage.preview : null,
      conditionImage: conditionImage ? conditionImage.preview : null,
      roomsImage: roomsImage ? roomsImage.preview : null,
      waterImage: waterImage ? waterImage.preview : null,
      electricityImage: electricityImage ? electricityImage.preview : null,
      roofImages: roofImages.map(img => img.preview),
      facadeImages: facadeImages.map(img => img.preview),
      offerType
    };

    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
      });
      if (!res.ok) {
        console.error('Fehler beim Senden der Daten');
      } else {
        const data = await res.json();
        console.log('Erfolgreich gespeichert, ID:', data.id);
        // Nach dem Absenden weiterleiten zur HomeAfterLogin-Seite
        router.push('/homeafterlogin');
      }
    } catch (err) {
      console.error('Ein Fehler ist aufgetreten', err);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>{content[lang].headline}</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Land */}
          <label style={styles.label}>{content[lang].formLabels.country}
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.country}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setCountryImage)} style={styles.input} />
            {countryImage && <img src={countryImage.preview} alt="Country preview" style={styles.preview} />}
          </label>
          
          {/* Adresse */}
          <label style={styles.label}>{content[lang].formLabels.address}
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.address}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setAddressImage)} style={styles.input} />
            {addressImage && <img src={addressImage.preview} alt="Address preview" style={styles.preview} />}
          </label>
          
          {/* Baujahr */}
          <label style={styles.label}>{content[lang].formLabels.yearBuilt}
            <input type="text" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.yearBuilt}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setYearBuiltImage)} style={styles.input} />
            {yearBuiltImage && <img src={yearBuiltImage.preview} alt="Year Built preview" style={styles.preview} />}
          </label>
          
          {/* Zustand */}
          <label style={styles.label}>{content[lang].formLabels.condition}
            <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.condition}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setConditionImage)} style={styles.input} />
            {conditionImage && <img src={conditionImage.preview} alt="Condition preview" style={styles.preview} />}
          </label>
          
          {/* Anzahl Zimmer */}
          <label style={styles.label}>{content[lang].formLabels.rooms}
            <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.rooms}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setRoomsImage)} style={styles.input} />
            {roomsImage && <img src={roomsImage.preview} alt="Rooms preview" style={styles.preview} />}
          </label>
          
          {/* Wasser */}
          <label style={styles.label}>{content[lang].formLabels.water}
            <input type="text" value={water} onChange={(e) => setWater(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.water}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setWaterImage)} style={styles.input} />
            {waterImage && <img src={waterImage.preview} alt="Water preview" style={styles.preview} />}
          </label>
          
          {/* Elektrizität */}
          <label style={styles.label}>{content[lang].formLabels.electricity}
            <input type="text" value={electricity} onChange={(e) => setElectricity(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.electricity}
            <input type="file" accept="image/*" onChange={(e) => handleSingleImageChange(e, setElectricityImage)} style={styles.input} />
            {electricityImage && <img src={electricityImage.preview} alt="Electricity preview" style={styles.preview} />}
          </label>
          
          {/* Mehrfachbilder für Dach (max. 2) */}
          <label style={styles.label}>{content[lang].fileLabels.roof}
            <input type="file" accept="image/*" multiple onChange={(e) => handleMultipleImageChange(e, setRoofImages, 2)} style={styles.input} />
            <div style={styles.previewContainer}>
              {roofImages.map((img, index) => (
                <img key={index} src={img.preview} alt={`Roof preview ${index + 1}`} style={styles.preview} />
              ))}
            </div>
          </label>
          
          {/* Mehrfachbilder für Fassade (max. 4) */}
          <label style={styles.label}>{content[lang].fileLabels.facade}
            <input type="file" accept="image/*" multiple onChange={(e) => handleMultipleImageChange(e, setFacadeImages, 4)} style={styles.input} />
            <div style={styles.previewContainer}>
              {facadeImages.map((img, index) => (
                <img key={index} src={img.preview} alt={`Facade preview ${index + 1}`} style={styles.preview} />
              ))}
            </div>
          </label>
          
          {/* Auswahl der Angebotsart */}
          <div style={styles.buttonGroup}>
            <button type="button" onClick={() => setOfferType('angebot')} style={{ ...styles.button, backgroundColor: offerType === 'angebot' ? '#005bb5' : '#0070f3' }}>
              {content[lang].buttons.angebot}
            </button>
            <button type="button" onClick={() => setOfferType('vermarktung')} style={{ ...styles.button, backgroundColor: offerType === 'vermarktung' ? '#005bb5' : '#0070f3' }}>
              {content[lang].buttons.vermarktung}
            </button>
          </div>
          <p style={styles.explanation}>{content[lang].explanation}</p>
          
          <button type="submit" style={styles.submitButton}>Daten absenden</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '80px',
    padding: '20px',
    maxWidth: '800px',
    margin: '80px auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    marginTop: '5px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  preview: {
    marginTop: '10px',
    maxWidth: '100px',
    maxHeight: '100px'
  },
  previewContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  explanation: {
    marginTop: '10px',
    fontStyle: 'italic'
  }
};

export default SellPage;
