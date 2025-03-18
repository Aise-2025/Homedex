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

  // Bilddaten (einzelne Bilder werden als Objekte, Mehrfachbilder als Array)
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
  // Zustand für conditionImage hinzufügen
  const [conditionImage, setConditionImage] = useState(null);

  // Angebotsart (Nutzer entscheidet: 'angebot' = Verkauf, 'vermarktung' = Vermarktung)
  const [offerType, setOfferType] = useState('');

  // Inhalte (Texte, Labels und Optionswerte) in beiden Sprachen
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
        angebot: "Verkaufen",
        vermarktung: "Vermarkten"
      },
      formLabels: {
        country: "Land",
        address: "Adresse",
        yearBuilt: "Baujahr",
        condition: "Zustand",
        rooms: "Anzahl Zimmer",
        water: "Wasser (Neu/Alt)",
        electricity: "Elektrizität (Jahr)",
        livingArea: "Wohnfläche (m²)",
        plotArea: "Grundstück (m²)",
        availableFrom: "Bezugsfrei ab",
        bedrooms: "Schlafzimmer",
        bathrooms: "Badezimmer",
        garage: "Garage/Stellplatz",
        propertyDescription: "Objektbeschreibung",
        features: "Ausstattung",
        heatingSystem: "Heizungsanlage",
        heatingType: "Heizungsart",
        mainEnergySources: "Wesentliche Energieträger",
        energyCertificate: "Energieausweis",
        energyCertificateType: "Energieausweistyp",
        finalEnergyDemand: "Endenergiebedarf (kWh/m²*a)",
        energyEfficiency: "Energieeffizienzklasse",
        yearEnergyCertificate: "Baujahr laut Energieausweis",
        price: "Preisvorstellung (in €)"
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
        angebot: "Sell",
        vermarktung: "Market"
      },
      formLabels: {
        country: "Country",
        address: "Address",
        yearBuilt: "Year Built",
        condition: "Condition",
        rooms: "Number of Rooms",
        water: "Water (New/Old)",
        electricity: "Electricity (Year)",
        livingArea: "Living Area (m²)",
        plotArea: "Plot Area (m²)",
        availableFrom: "Available from",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        garage: "Garage/Parking",
        propertyDescription: "Property Description",
        features: "Features",
        heatingSystem: "Heating System",
        heatingType: "Heating Type",
        mainEnergySources: "Main Energy Sources",
        energyCertificate: "Energy Certificate",
        energyCertificateType: "Energy Certificate Type",
        finalEnergyDemand: "Final Energy Demand (kWh/m²*a)",
        energyEfficiency: "Energy Efficiency Class",
        yearEnergyCertificate: "Year per Energy Certificate",
        price: "Price expectation (in €)"
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
      }
    }
  };

  // Handler für einzelne Datei-Uploads
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
    // Wähle den API-Endpunkt basierend auf der Angebotsart:
    const endpoint = offerType === 'angebot' ? '/api/buy' : '/api/marketing';
    
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
      const res = await fetch(endpoint, {
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

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>{headerTitle}</h1>
        <p>{headerSubtitle}</p>
        <h2>{content[lang].headline}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Basisfelder */}
          <label style={styles.label}>{content[lang].formLabels.country}
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.country}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCountryImage)} style={styles.input} />
            {countryImage && <img src={countryImage.preview} alt="Country preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.address}
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.address}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setAddressImage)} style={styles.input} />
            {addressImage && <img src={addressImage.preview} alt="Address preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.yearBuilt}
            <input type="text" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.yearBuilt}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setYearBuiltImage)} style={styles.input} />
            {yearBuiltImage && <img src={yearBuiltImage.preview} alt="Year Built preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.condition}
            <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.condition}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setConditionImage)} style={styles.input} />
            {conditionImage && <img src={conditionImage.preview} alt="Condition preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.rooms}
            <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.rooms}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setRoomsImage)} style={styles.input} />
            {roomsImage && <img src={roomsImage.preview} alt="Rooms preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.water}
            <input type="text" value={water} onChange={(e) => setWater(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.water}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setWaterImage)} style={styles.input} />
            {waterImage && <img src={waterImage.preview} alt="Water preview" style={styles.preview} />}
          </label>

          <label style={styles.label}>{content[lang].formLabels.electricity}
            <input type="text" value={electricity} onChange={(e) => setElectricity(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].fileLabels.electricity}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setElectricityImage)} style={styles.input} />
            {electricityImage && <img src={electricityImage.preview} alt="Electricity preview" style={styles.preview} />}
          </label>

          {/* Neue Felder für Filter/Eintrag */}
          <label style={styles.label}>{content[lang].formLabels.livingArea}
            <input type="number" value={livingArea} onChange={(e) => setLivingArea(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.plotArea}
            <input type="number" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.availableFrom}
            <input type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.bedrooms}
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.bathrooms}
            <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.garage}
            <input type="text" value={garage} onChange={(e) => setGarage(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.propertyDescription}
            <textarea value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)} placeholder={content[lang].placeholderPropertyDescription} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.features}
            <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.heatingSystem}
            <input type="text" value={heatingSystem} onChange={(e) => setHeatingSystem(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.heatingType}
            <input type="text" value={heatingType} onChange={(e) => setHeatingType(e.target.value)} required style={styles.input} placeholder={texts[lang].optionHeatingType} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.mainEnergySources}
            <input type="text" value={mainEnergySources} onChange={(e) => setMainEnergySources(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.energyCertificate}
            <input type="text" value={energyCertificate} onChange={(e) => setEnergyCertificate(e.target.value)} placeholder={texts[lang].optionEnergyCertificate} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.energyCertificateType}
            <input type="text" value={energyCertificateType} onChange={(e) => setEnergyCertificateType(e.target.value)} placeholder={texts[lang].optionEnergyCertificateType} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.finalEnergyDemand}
            <input type="number" value={finalEnergyDemand} onChange={(e) => setFinalEnergyDemand(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.energyEfficiency}
            <input type="text" value={energyEfficiency} onChange={(e) => setEnergyEfficiency(e.target.value)} required style={styles.input} />
          </label>
          <label style={styles.label}>{content[lang].formLabels.yearEnergyCertificate}
            <input type="number" value={yearEnergyCertificate} onChange={(e) => setYearEnergyCertificate(e.target.value)} required style={styles.input} />
          </label>
          {/* Neues Feld: Preisvorstellung */}
          <label style={styles.label}>{content[lang].formLabels.price}
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
          </label>
          {/* Ende der neuen Felder */}
          
          {/* Mehrfachbilder für Dach (max. 2) */}
          <label style={styles.label}>{content[lang].fileLabels.roof}
            <input type="file" accept="image/*" multiple onChange={(e) => handleMultipleFileChange(e, setRoofImages, 2)} style={styles.input} />
            <div style={styles.previewContainer}>
              {roofImages.map((img, index) => (
                <img key={index} src={img.preview} alt={`Roof preview ${index + 1}`} style={styles.preview} />
              ))}
            </div>
          </label>
          
          {/* Mehrfachbilder für Fassade (max. 4) */}
          <label style={styles.label}>{content[lang].fileLabels.facade}
            <input type="file" accept="image/*" multiple onChange={(e) => handleMultipleFileChange(e, setFacadeImages, 4)} style={styles.input} />
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
          
          <button type="submit" style={styles.submitButton}>{content[lang].submitButton}</button>
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

export default SellPage;
