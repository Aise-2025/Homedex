import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { LanguageContext } from '../context/LanguageContext';

const SellPage = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();

  // Headertexte
  const headerTitle = lang === 'de' 
    ? "Bitte füllen Sie alle Felder aus" 
    : "Please fill in all fields";
  const headerSubtitle = lang === 'de' 
    ? "Damit wir Ihnen in den nächsten 24 Stunden ein Angebot unterbreiten können." 
    : "So that we can present you with an offer within the next 24 hours.";

  // Basisdaten zur Immobilie
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [livingArea, setLivingArea] = useState('');
  const [plotArea, setPlotArea] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [rooms, setRooms] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [garage, setGarage] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [heatingSystem, setHeatingSystem] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [mainEnergySources, setMainEnergySources] = useState('');
  const [energyCertificate, setEnergyCertificate] = useState('');
  const [energyCertificateType, setEnergyCertificateType] = useState('');
  const [finalEnergyDemand, setFinalEnergyDemand] = useState('');
  const [energyEfficiency, setEnergyEfficiency] = useState('');
  const [yearEnergyCertificate, setYearEnergyCertificate] = useState('');
  // Neues Feld: Preisvorstellung
  const [price, setPrice] = useState('');

  // Bilddaten (Mehrfachbilder werden als Array gespeichert, einzelne als Objekt)
  const [exteriorImages, setExteriorImages] = useState([]);
  const [heatingImages, setHeatingImages] = useState([]);
  const [electricalImages, setElectricalImages] = useState([]);
  const [livingRoomImages, setLivingRoomImages] = useState([]);
  const [bedroomImages, setBedroomImages] = useState([]);
  const [childrenCount, setChildrenCount] = useState('');
  const [childrenRoomImages, setChildrenRoomImages] = useState([]);
  const [roofImages, setRoofImages] = useState([]);
  const [kitchenImages, setKitchenImages] = useState([]);
  const [storage, setStorage] = useState('');
  const [garageExtra, setGarageExtra] = useState('');
  const [office, setOffice] = useState('');
  const [floorPlan, setFloorPlan] = useState(null);
  const [locationPlan, setLocationPlan] = useState(null);

  // Angebotsart (hier kann der Nutzer wählen, ob er ein direktes Angebot oder eine Vermarktung möchte)
  const [offerType, setOfferType] = useState('');

  // Inhalte (Texte und Optionswerte) in beiden Sprachen
  const content = {
    de: {
      headline: "Immobilie verkaufen",
      submitButton: "Anfrage absenden",
      explanation: {
        angebot: "Angebot: 7 % des Verkaufspreises.",
        vermarktung: "Vermarktung: 1 % für Käufer und Verkäufer vom Verkaufspreis."
      },
      options: {
        heatingType: ["Nachtspeicheröfen", "Gasheizung", "Ölheizung", "Wärmepumpe"],
        energyCertificate: ["liegt vor", "nicht vorhanden"],
        energyCertificateType: ["Bedarfsausweis", "Verbrauchsausweis"]
      },
      buttons: {
        angebot: "Angebot",
        vermarktung: "Vermarktung"
      }
    },
    en: {
      headline: "Sell Your Property",
      submitButton: "Submit Request",
      explanation: {
        angebot: "Offer: 7% of the sale price.",
        vermarktung: "Marketing: 1% fee for both buyer and seller."
      },
      options: {
        heatingType: ["Storage Heaters", "Gas Heating", "Oil Heating", "Heat Pump"],
        energyCertificate: ["available", "not available"],
        energyCertificateType: ["Demand Certificate", "Consumption Certificate"]
      },
      buttons: {
        angebot: "Offer",
        vermarktung: "Marketing"
      }
    }
  };

  // Handler für Datei-Uploads (einzeln)
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter({ file, preview: URL.createObjectURL(file) });
    }
  };

  // Handler für Mehrfachdatei-Uploads
  const handleMultipleFileChange = (e, setter, maxCount) => {
    const files = Array.from(e.target.files).slice(0, maxCount);
    const images = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setter(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = {
      address,
      country,
      livingArea,
      plotArea,
      availableFrom,
      rooms,
      bedrooms,
      bathrooms,
      garage,
      propertyDescription,
      features,
      heatingSystem,
      yearBuilt,
      heatingType,
      mainEnergySources,
      energyCertificate,
      energyCertificateType,
      finalEnergyDemand,
      energyEfficiency,
      yearEnergyCertificate,
      // Neues Feld: Preisvorstellung
      price,
      exteriorImages: exteriorImages.map(img => img.preview),
      heatingImages: heatingImages.map(img => img.preview),
      electricalImages: electricalImages.map(img => img.preview),
      livingRoomImages: livingRoomImages.map(img => img.preview),
      bedroomImages: bedroomImages.map(img => img.preview),
      childrenCount,
      childrenRoomImages: childrenRoomImages.map(img => img.preview),
      roofImages: roofImages.map(img => img.preview),
      kitchenImages: kitchenImages.map(img => img.preview),
      storage,
      garageExtra,
      office,
      floorPlan: floorPlan ? floorPlan.preview : null,
      locationPlan: locationPlan ? locationPlan.preview : null,
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
        router.push('/homeafterlogin');
      }
    } catch (err) {
      console.error('Ein Fehler ist aufgetreten', err);
    }
  };

  // Für Platzhalter und Labels (aus dem texts-Objekt) benötigen wir zusätzliche Übersetzungen.
  const texts = {
    de: {
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
      labelPropertyDescription: "Objektbeschreibung",
      placeholderPropertyDescription: "Freier Text",
      labelFeatures: "Ausstattung",
      labelHeatingSystem: "Heizungsanlage",
      labelYearBuilt: "Baujahr",
      labelHeatingType: "Heizungsart",
      optionHeatingType: content.de.options.heatingType.join(", "),
      labelMainEnergySources: "Wesentliche Energieträger",
      labelEnergyCertificate: "Energieausweis",
      optionEnergyCertificate: content.de.options.energyCertificate.join(" / "),
      labelEnergyCertificateType: "Energieausweistyp",
      optionEnergyCertificateType: content.de.options.energyCertificateType.join(" / "),
      labelFinalEnergyDemand: "Endenergiebedarf (kWh/m²*a)",
      labelEnergyEfficiency: "Energieeffizienzklasse",
      labelYearEnergyCertificate: "Baujahr laut Energieausweis",
      labelUploadImages: "Bilder hochladen",
      labelExterior: "Außenansicht (4 Bilder) *",
      labelHeatingImages: "Heizungsanlage (2 Bilder) *",
      labelElectricalImages: "Stromkasten (2 Bilder) *",
      labelLivingRoomImages: "Wohnzimmer (mindestens 1 Bild) *",
      labelBedroomImages: "Schlafzimmer (mindestens 1 Bild) *",
      labelChildrenCount: "Anzahl Kinderzimmer",
      labelChildrenRoomImages: "Kinderzimmer Bilder (mindestens 1 pro Kinderzimmer, falls > 0)",
      labelRoofImages: "Dach Fotos (mindestens 1 Bild) *",
      labelKitchenImages: "Küche (mindestens 2 Bilder) *",
      labelStorage: "Abstellraum",
      labelGarageExtra: "Garage",
      labelOffice: "Arbeitszimmer",
      labelFloorPlan: "Grundriss (optional)",
      labelLocationPlan: "Lageplan (optional)",
      labelPrice: "Preisvorstellung (in €)"
    },
    en: {
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
      labelPropertyDescription: "Property Description",
      placeholderPropertyDescription: "Free text",
      labelFeatures: "Features",
      labelHeatingSystem: "Heating System",
      labelYearBuilt: "Year Built",
      labelHeatingType: "Heating Type",
      optionHeatingType: content.en.options.heatingType.join(", "),
      labelMainEnergySources: "Main Energy Sources",
      labelEnergyCertificate: "Energy Certificate",
      optionEnergyCertificate: content.en.options.energyCertificate.join(" / "),
      labelEnergyCertificateType: "Energy Certificate Type",
      optionEnergyCertificateType: content.en.options.energyCertificateType.join(" / "),
      labelFinalEnergyDemand: "Final Energy Demand (kWh/m²*a)",
      labelEnergyEfficiency: "Energy Efficiency Class",
      labelYearEnergyCertificate: "Year per Energy Certificate",
      labelUploadImages: "Upload Images",
      labelExterior: "Exterior (4 images) *",
      labelHeatingImages: "Heating System (2 images) *",
      labelElectricalImages: "Electrical Panel (2 images) *",
      labelLivingRoomImages: "Living Room (at least 1 image) *",
      labelBedroomImages: "Bedroom (at least 1 image) *",
      labelChildrenCount: "Number of Children's Rooms",
      labelChildrenRoomImages: "Children's Room Images (at least 1 per room if > 0)",
      labelRoofImages: "Roof Photos (at least 1 image) *",
      labelKitchenImages: "Kitchen (at least 2 images) *",
      labelStorage: "Storage",
      labelGarageExtra: "Garage",
      labelOffice: "Office",
      labelFloorPlan: "Floor Plan (optional)",
      labelLocationPlan: "Location Plan (optional)",
      labelPrice: "Price expectation (in €)"
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>{headerTitle}</h1>
        <p>{headerSubtitle}</p>
        <h2>{content[lang].headline}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Adresse */}
          <label style={styles.label}>{texts[lang].labelAddress}
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder={`${texts[lang].placeholderStreet}, ${texts[lang].placeholderPostal}`}
              required 
              style={styles.input} 
            />
          </label>
          {/* Land */}
          <label style={styles.label}>{texts[lang].placeholderCountry}
            <input 
              type="text" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              placeholder={texts[lang].placeholderCountry}
              required 
              style={styles.input} 
            />
          </label>
          {/* Wohnfläche */}
          <label style={styles.label}>{texts[lang].labelLivingArea}
            <input 
              type="number" 
              value={livingArea} 
              onChange={(e) => setLivingArea(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Grundstücksfläche */}
          <label style={styles.label}>{texts[lang].labelPlotArea}
            <input 
              type="number" 
              value={plotArea} 
              onChange={(e) => setPlotArea(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Bezugsfrei ab */}
          <label style={styles.label}>{texts[lang].labelAvailableFrom}
            <input 
              type="date" 
              value={availableFrom} 
              onChange={(e) => setAvailableFrom(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Neuer Input: Preisvorstellung */}
          <label style={styles.label}>{texts[lang].labelPrice}
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Zimmer */}
          <label style={styles.label}>{texts[lang].labelRooms}
            <input 
              type="number" 
              value={rooms} 
              onChange={(e) => setRooms(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Schlafzimmer */}
          <label style={styles.label}>{texts[lang].labelBedrooms}
            <input 
              type="number" 
              value={bedrooms} 
              onChange={(e) => setBedrooms(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Badezimmer */}
          <label style={styles.label}>{texts[lang].labelBathrooms}
            <input 
              type="number" 
              value={bathrooms} 
              onChange={(e) => setBathrooms(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Garage/Stellplatz */}
          <label style={styles.label}>{texts[lang].labelGarage}
            <input 
              type="text" 
              value={garage} 
              onChange={(e) => setGarage(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Objektbeschreibung */}
          <label style={styles.label}>{texts[lang].labelPropertyDescription}
            <input 
              type="text" 
              value={propertyDescription} 
              onChange={(e) => setPropertyDescription(e.target.value)} 
              placeholder={texts[lang].placeholderPropertyDescription} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Ausstattung */}
          <label style={styles.label}>{texts[lang].labelFeatures}
            <input 
              type="text" 
              value={features} 
              onChange={(e) => setFeatures(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Heizungsanlage */}
          <label style={styles.label}>{texts[lang].labelHeatingSystem}
            <input 
              type="text" 
              value={heatingSystem} 
              onChange={(e) => setHeatingSystem(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Baujahr */}
          <label style={styles.label}>{texts[lang].labelYearBuilt}
            <input 
              type="number" 
              value={yearBuilt} 
              onChange={(e) => setYearBuilt(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Heizungsart */}
          <label style={styles.label}>{texts[lang].labelHeatingType}
            <input 
              type="text" 
              value={heatingType} 
              onChange={(e) => setHeatingType(e.target.value)} 
              placeholder={texts[lang].optionHeatingType} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Wesentliche Energieträger */}
          <label style={styles.label}>{texts[lang].labelMainEnergySources}
            <input 
              type="text" 
              value={mainEnergySources} 
              onChange={(e) => setMainEnergySources(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Energieausweis */}
          <label style={styles.label}>{texts[lang].labelEnergyCertificate}
            <input 
              type="text" 
              value={energyCertificate} 
              onChange={(e) => setEnergyCertificate(e.target.value)} 
              placeholder={texts[lang].optionEnergyCertificate} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Energieausweistyp */}
          <label style={styles.label}>{texts[lang].labelEnergyCertificateType}
            <input 
              type="text" 
              value={energyCertificateType} 
              onChange={(e) => setEnergyCertificateType(e.target.value)} 
              placeholder={texts[lang].optionEnergyCertificateType} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Endenergiebedarf */}
          <label style={styles.label}>{texts[lang].labelFinalEnergyDemand}
            <input 
              type="number" 
              value={finalEnergyDemand} 
              onChange={(e) => setFinalEnergyDemand(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Energieeffizienz */}
          <label style={styles.label}>{texts[lang].labelEnergyEfficiency}
            <input 
              type="text" 
              value={energyEfficiency} 
              onChange={(e) => setEnergyEfficiency(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Baujahr laut Energieausweis */}
          <label style={styles.label}>{texts[lang].labelYearEnergyCertificate}
            <input 
              type="number" 
              value={yearEnergyCertificate} 
              onChange={(e) => setYearEnergyCertificate(e.target.value)} 
              required 
              style={styles.input} 
            />
          </label>
          {/* Bilder hochladen */}
          <h3>{texts[lang].labelUploadImages}</h3>
          {/* Außenansicht (4 Bilder) */}
          <label style={styles.label}>{texts[lang].labelExterior}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setExteriorImages, 4)} 
              style={styles.input} 
            />
          </label>
          {/* Heizungsanlage (2 Bilder) */}
          <label style={styles.label}>{texts[lang].labelHeatingImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setHeatingImages, 2)} 
              style={styles.input} 
            />
          </label>
          {/* Stromkasten (2 Bilder) */}
          <label style={styles.label}>{texts[lang].labelElectricalImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setElectricalImages, 2)} 
              style={styles.input} 
            />
          </label>
          {/* Wohnzimmer (mindestens 1 Bild) */}
          <label style={styles.label}>{texts[lang].labelLivingRoomImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              onChange={(e) => handleMultipleFileChange(e, setLivingRoomImages, 1)} 
              style={styles.input} 
            />
          </label>
          {/* Schlafzimmer (mindestens 1 Bild) */}
          <label style={styles.label}>{texts[lang].labelBedroomImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              onChange={(e) => handleMultipleFileChange(e, setBedroomImages, 1)} 
              style={styles.input} 
            />
          </label>
          {/* Anzahl Kinderzimmer */}
          <label style={styles.label}>{texts[lang].labelChildrenCount}
            <input 
              type="number" 
              value={childrenCount} 
              onChange={(e) => setChildrenCount(e.target.value)} 
              style={styles.input} 
            />
          </label>
          {/* Kinderzimmer Bilder */}
          <label style={styles.label}>{texts[lang].labelChildrenRoomImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setChildrenRoomImages, 5)} 
              style={styles.input} 
            />
          </label>
          {/* Dach Fotos (mindestens 1 Bild) */}
          <label style={styles.label}>{texts[lang].labelRoofImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setRoofImages, 1)} 
              style={styles.input} 
            />
          </label>
          {/* Küche (mindestens 2 Bilder) */}
          <label style={styles.label}>{texts[lang].labelKitchenImages}
            <input 
              type="file" 
              accept=\"image/*\" 
              multiple 
              onChange={(e) => handleMultipleFileChange(e, setKitchenImages, 2)} 
              style={styles.input} 
            />
          </label>
          {/* Abstellraum */}
          <label style={styles.label}>{texts[lang].labelStorage}
            <input 
              type="text" 
              value={storage} 
              onChange={(e) => setStorage(e.target.value)} 
              style={styles.input} 
            />
          </label>
          {/* Garage */}
          <label style={styles.label}>{texts[lang].labelGarageExtra}
            <input 
              type="text" 
              value={garageExtra} 
              onChange={(e) => setGarageExtra(e.target.value)} 
              style={styles.input} 
            />
          </label>
          {/* Arbeitszimmer */}
          <label style={styles.label}>{texts[lang].labelOffice}
            <input 
              type="text" 
              value={office} 
              onChange={(e) => setOffice(e.target.value)} 
              style={styles.input} 
            />
          </label>
          {/* Grundriss (optional) */}
          <label style={styles.label}>{texts[lang].labelFloorPlan}
            <input 
              type="file" 
              accept=\"image/*\" 
              onChange={(e) => handleFileChange(e, setFloorPlan)} 
              style={styles.input} 
            />
            {floorPlan && <img src={floorPlan.preview} alt=\"Floor Plan preview\" style={styles.preview} /> }
          </label>
          {/* Lageplan (optional) */}
          <label style={styles.label}>{texts[lang].labelLocationPlan}
            <input 
              type="file" 
              accept=\"image/*\" 
              onChange={(e) => handleFileChange(e, setLocationPlan)} 
              style={styles.input} 
            />
            {locationPlan && <img src={locationPlan.preview} alt=\"Location Plan preview\" style={styles.preview} /> }
          </label>
          
          {/* Auswahl der Angebotsart */}
          <div style={styles.buttonGroup}>
            <button type=\"button\" onClick={() => setOfferType('angebot')} style={{ ...styles.button, backgroundColor: offerType === 'angebot' ? '#005bb5' : '#0070f3' }}>
              {content[lang].buttons.angebot}
            </button>
            <button type=\"button\" onClick={() => setOfferType('vermarktung')} style={{ ...styles.button, backgroundColor: offerType === 'vermarktung' ? '#005bb5' : '#0070f3' }}>
              {content[lang].buttons.vermarktung}
            </button>
          </div>
          <p style={styles.explanation}>{content[lang].explanation}</p>
          
          <button type=\"submit\" style={styles.submitButton}>{content[lang].submitButton}</button>
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
  }
};

export default MarketingPage;
