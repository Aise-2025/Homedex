import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { LanguageContext } from '../context/LanguageContext';

const MarketingPage = () => {
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

  // Bei der Vermarktung ist der OfferType fest auf "vermarktung"
  const offerType = 'vermarktung';

  // Texte in beiden Sprachen
  const content = {
    de: {
      headline: "Immobilie vermarkten",
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
      explanation: "Vermarktung: Homedex vermarktet Ihre Immobilie digital. Es fällt eine Gebühr von 1 % für Käufer und Verkäufer vom Verkaufspreis an.",
      submitButton: "Daten absenden"
    },
    en: {
      headline: "Market Your Property",
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
      explanation: "Marketing: Homedex markets your property digitally. A fee of 1% of the sale price applies for both buyer and seller.",
      submitButton: "Submit Data"
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
        // Nach dem Absenden wird zur HomeAfterLogin-Seite weitergeleitet
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
            {electricityImage && <img src={electricityImage.preview} alt="Electricity preview" style={styles.preview} />}\n          </label>\n          \n          {/* Mehrfachbilder für Dach (max. 2) */}\n          <label style={styles.label}>{content[lang].fileLabels.roof}\n            <input type=\"file\" accept=\"image/*\" multiple onChange={(e) => handleMultipleImageChange(e, setRoofImages, 2)} style={styles.input} />\n            <div style={styles.previewContainer}>\n              {roofImages.map((img, index) => (\n                <img key={index} src={img.preview} alt={`Roof preview ${index + 1}`} style={styles.preview} />\n              ))}\n            </div>\n          </label>\n          \n          {/* Mehrfachbilder für Fassade (max. 4) */}\n          <label style={styles.label}>{content[lang].fileLabels.facade}\n            <input type=\"file\" accept=\"image/*\" multiple onChange={(e) => handleMultipleImageChange(e, setFacadeImages, 4)} style={styles.input} />\n            <div style={styles.previewContainer}>\n              {facadeImages.map((img, index) => (\n                <img key={index} src={img.preview} alt={`Facade preview ${index + 1}`} style={styles.preview} />\n              ))}\n            </div>\n          </label>\n          \n          <p style={styles.explanation}>{content[lang].explanation}</p>\n          \n          <button type=\"submit\" style={styles.submitButton}>{content[lang].submitButton}</button>\n        </form>\n      </div>\n    </div>\n  );\n};\n\nconst styles = {\n  container: {\n    marginTop: '80px',\n    padding: '20px',\n    maxWidth: '800px',\n    margin: '80px auto',\n    textAlign: 'center',\n    backgroundColor: '#f9f9f9',\n    borderRadius: '10px',\n    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'\n  },\n  form: {\n    display: 'flex',\n    flexDirection: 'column',\n    gap: '20px',\n    padding: '20px'\n  },\n  label: {\n    display: 'flex',\n    flexDirection: 'column',\n    textAlign: 'left',\n    fontWeight: 'bold'\n  },\n  input: {\n    padding: '10px',\n    fontSize: '1em',\n    marginTop: '5px'\n  },\n  button: {\n    padding: '10px 20px',\n    fontSize: '1em',\n    color: '#fff',\n    border: 'none',\n    borderRadius: '5px',\n    cursor: 'pointer',\n    transition: 'background 0.3s'\n  },\n  submitButton: {\n    backgroundColor: '#28a745',\n    color: '#fff',\n    padding: '15px 30px',\n    fontSize: '1.2em',\n    border: 'none',\n    borderRadius: '5px',\n    cursor: 'pointer',\n    marginTop: '20px'\n  },\n  preview: {\n    marginTop: '10px',\n    maxWidth: '100px',\n    maxHeight: '100px'\n  },\n  previewContainer: {\n    display: 'flex',\n    gap: '10px',\n    flexWrap: 'wrap'\n  },\n  explanation: {\n    marginTop: '10px',\n    fontStyle: 'italic'\n  }\n};\n\nexport default MarketingPage;\n```

### Wichtige Punkte:
- **Datenfelder & Bilder:**  
  Alle Eingabefelder sowie die Bildvorschauen werden wie in der SellPage verwaltet.
- **OfferType:**  
  Dieser ist in der MarketingPage fest auf `"vermarktung"` gesetzt, sodass beim Absenden alle Daten mit diesem Wert an den API-Endpoint gesendet werden.
- **API-Call:**  
  Die Daten werden per POST-Request an `/api/sell` gesendet. Dort solltest du im Backend unterscheiden können, ob es sich um ein Angebot oder eine Vermarktung handelt (hier wird "vermarktung" übergeben).
- **Weiterleitung:**  
  Nach erfolgreicher Speicherung wird der Benutzer auf die "HomeAfterLogin"-Seite weitergeleitet.
- **Sprache:**  
  Alle Texte werden basierend auf dem aktuell im LanguageContext gewählten Wert (de/en) angezeigt.

Passe den Code gerne weiter an deine Anforderungen an. Falls du Fragen hast oder weitere Änderungen benötigst, stehe ich dir gerne zur Verfügung!

