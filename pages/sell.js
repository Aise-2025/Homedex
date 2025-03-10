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
  // Wir erweitern das texts-Objekt um die fehlenden Felder.
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
      labelKitchenImages: "Küche (mindestens 2 Bilder) *
