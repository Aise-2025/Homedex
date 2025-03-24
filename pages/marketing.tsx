// pages/marketing.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  description: string;
  images: string[];
  baujahr: number;
  grundstueck: string;
  zimmer: number;
  ort: string;
  land: string;
  preis: number;
  status: string; // z. B. "vermarkten", "verkauft"
  // Optional: Käuferdaten, die nach dem Kauf gesetzt werden
  buyer?: {
    vorname: string;
    nachname: string;
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    land: string;
    telefon: string;
    email: string;
  };
}

interface Translations {
  marketing: {
    title: string;
    filterLabel: string;
    propertyCard: {
      verkaufen: string;
      kaufen: string;
    };
    buyerForm: {
      title: string;
      vorname: string;
      nachname: string;
      strasse: string;
      hausnummer: string;
      plz: string;
      ort: string;
      land: string;
      telefon: string;
      email: string;
      submit: string;
      cancel: string;
    };
  };
}

export default function MarketingPage() {
  const [language, setLanguage] = useState("de");
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    land: "",
    ort: "",
    plz: "",
    baujahr: "",
    preisVon: "",
    preisBis: ""
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    vorname: "",
    nachname: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    land: "",
    telefon: "",
    email: ""
  });

  // Sprache aus localStorage laden (Standard: "de")
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

  // Manuelle Übersetzungen für Marketing (Deutsch und Englisch)
  const translations: { [key: string]: Translations } = {
    de: {
      marketing: {
        title: "Marktplatz",
        filterLabel: "Filter",
        propertyCard: {
          verkaufen: "Immobilie Verkaufen",
          kaufen: "Kaufen"
        },
        buyerForm: {
          title: "Käuferdaten eingeben",
          vorname: "Vorname",
          nachname: "Nachname",
          strasse: "Straße",
          hausnummer: "Hausnummer",
          plz: "Postleitzahl",
          ort: "Ort",
          land: "Land",
          telefon: "Telefonnummer",
          email: "E-Mail",
          submit: "Daten absenden",
          cancel: "Abbrechen"
        }
      }
    },
    en: {
      marketing: {
        title: "Marketplace",
        filterLabel: "Filter",
        propertyCard: {
          verkaufen: "Sell Property",
          kaufen: "Buy"
        },
        buyerForm: {
          title: "Enter Buyer Information",
          vorname: "First Name",
          nachname: "Last Name",
          strasse: "Street",
          hausnummer: "House Number",
          plz: "Postal Code",
          ort: "City",
          land: "Country",
          telefon: "Phone Number",
          email: "Email",
          submit: "Submit",
          cancel: "Cancel"
        }
      }
    }
    // Weitere Sprachen können hier ergänzt werden
  };

  const t = translations[language].marketing;

  // Lade Immobilien-Daten vom API-Endpunkt
  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.properties);
        }
      })
      .catch((err) => console.error("Error loading properties:", err));
  }, []);

  // Filter-Handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Filtere Immobilien basierend auf den Filterwerten
  const filteredProperties = properties.filter((property) => {
    if (filters.land && !property.land.toLowerCase().includes(filters.land.toLowerCase())) return false;
    if (filters.ort && !property.ort.toLowerCase().includes(filters.ort.toLowerCase())) return false;
    if (filters.plz && property.plz && !property.plz.toString().includes(filters.plz)) return false;
    if (filters.baujahr && property.baujahr.toString() !== filters.baujahr) return false;
    if (filters.preisVon && property.preis < parseFloat(filters.preisVon)) return false;
    if (filters.preisBis && property.preis > parseFloat(filters.preisBis)) return false;
    return true;
  });

  // Wenn "Kaufen" gedrückt wird, öffne das Käufer-Formular
  const handleBuyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowBuyerForm(true);
  };

  // Käufer-Formular absenden: API-Aufruf zum Kauf (z.B. /api/buyProperty)
  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;
    const res = await fetch("/api/buyProperty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: selectedProperty.id,
        buyerInfo: buyerInfo
      })
    });
    const data = await res.json();
    if (data.success) {
      // Aktualisiere den Status der Immobilie auf "verkauft" und speichere Käuferdaten
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === selectedProperty.id
            ? { ...prop, status: "verkauft", buyer: buyerInfo } // Vereinfachend, setze Buyer-Daten
            : prop
        )
      );
      setShowBuyerForm(false);
      setBuyerInfo({
        vorname: "",
        nachname: "",
        strasse: "",
        hausnummer: "",
        plz: "",
        ort: "",
        land: "",
        telefon: "",
        email: ""
      });
    } else {
      alert("Kauf fehlgeschlagen: " + data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>

      {/* Filterbereich */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t.filterLabel}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <input
            type="text"
            name="land"
            placeholder="Land"
            className="border p-2"
            value={filters.land}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="ort"
            placeholder="Ort"
            className="border p-2"
            value={filters.ort}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="plz"
            placeholder="PLZ"
            className="border p-2"
            value={filters.plz}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="baujahr"
            placeholder="Baujahr"
            className="border p-2"
            value={filters.baujahr}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="preisVon"
            placeholder="Preis von"
            className="border p-2"
            value={filters.preisVon}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="preisBis"
            placeholder="Preis bis"
            className="border p-2"
            value={filters.preisBis}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Immobilienliste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map((property) => (
          <div key={property.id} className="relative border rounded p-4 shadow">
            {/* "Immobilie Verkaufen"-Button oben rechts */}
            <div className="absolute top-2 right-2">
              <Link href="/sell">
                <a className="bg-yellow-500 text-white px-2 py-1 rounded">
                  {t.propertyCard.verkaufen}
                </a>
              </Link>
            </div>
            <h2 className="text-2xl font-semibold">{property.title}</h2>
            <p className="mt-2">{property.description}</p>
            <p className="mt-2 text-sm">
              Baujahr: {property.baujahr} | Grundstück: {property.grundstueck} | Zimmer: {property.zimmer}
            </p>
            <p className="mt-2">
              Ort: {property.ort} | Preis: €{property.preis}
            </p>
            {/* Bilder als Swipe-Funktion (einfache horizontale Scroll-Ansicht) */}
            <div className="mt-2 flex overflow-x-auto space-x-2">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Bild ${index + 1}`}
                  className="w-32 h-32 object-cover rounded"
                />
              ))}
            </div>
            {/* Kauf-Button */}
            <div className="mt-4">
              <button
                onClick={() => handleBuyClick(property)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {t.propertyCard.kaufen}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Käufer-Daten-Formular (Modal) */}
      {showBuyerForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">{t.buyerForm.title}</h2>
            <form onSubmit={handleBuyerSubmit}>
              <div className="mb-2">
                <label>{t.buyerForm.vorname}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.vorname}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, vorname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.nachname}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.nachname}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, nachname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.strasse}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.strasse}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, strasse: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.hausnummer}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.hausnummer}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, hausnummer: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.plz}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.plz}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, plz: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.ort}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.ort}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, ort: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.land}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.land}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, land: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.telefon}:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={buyerInfo.telefon}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, telefon: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label>{t.buyerForm.email}:</label>
                <input
                  type="email"
                  className="w-full border p-2"
                  value={buyerInfo.email}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBuyerForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  {t.buyerForm.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {t.buyerForm.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// pages/marketing.tsx
import React from "react";

export default function MarketingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Willkommen bei Homedex</h1>
      <p className="mt-4">
        Hier finden Sie alle Informationen rund um den digitalen Immobilienverkauf – einfach, transparent und kosteneffizient.
      </p>
      {/* Weitere Marketing-Inhalte können hier hinzugefügt werden */}
    </div>
  );
}

