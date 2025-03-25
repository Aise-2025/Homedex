// pages/marketing.tsx
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  documents?: string[]; // URLs zu Dokumenten, die von sell.tsx kommen
  // Optional: Käufer- oder Verkäuferdaten
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
  seller?: {
    name: string;
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
      details: string;
      priceOffer: string;
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
    priceOfferForm: {
      title: string;
      offerPrice: string;
      submit: string;
      cancel: string;
    };
    detailModal: {
      title: string;
      close: string;
    };
  };
}

export default function MarketingPage() {
  const router = useRouter();
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
  const [selectedDetail, setSelectedDetail] = useState<Property | null>(null);
  // Neuer State für Preisangebot-Modal
  const [showPriceOfferForm, setShowPriceOfferForm] = useState(false);
  const [priceOffer, setPriceOffer] = useState("");

  // Übersetzungen (de, en, fr, es, it, nl, pl)
  const translations: { [key: string]: Translations } = {
    de: {
      marketing: {
        title: "Marktplatz",
        filterLabel: "Filter",
        propertyCard: {
          verkaufen: "Immobilie Verkaufen",
          kaufen: "Kaufen",
          details: "Details anzeigen",
          priceOffer: "Preisangebot senden"
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
        },
        priceOfferForm: {
          title: "Preisangebot eingeben",
          offerPrice: "Ihr Preisangebot (in €)",
          submit: "Angebot absenden",
          cancel: "Abbrechen"
        },
        detailModal: {
          title: "Immobiliendetails",
          close: "Schließen"
        }
      }
    },
    en: {
      marketing: {
        title: "Marketplace",
        filterLabel: "Filter",
        propertyCard: {
          verkaufen: "Sell Property",
          kaufen: "Buy",
          details: "View Details",
          priceOffer: "Send Price Offer"
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
        },
        priceOfferForm: {
          title: "Enter Your Price Offer",
          offerPrice: "Your offer (in €)",
          submit: "Send Offer",
          cancel: "Cancel"
        },
        detailModal: {
          title: "Property Details",
          close: "Close"
        }
      }
    },
    // Weitere Sprachen: fr, es, it, nl, pl (wie oben analog ergänzt)
    fr: {
      marketing: {
        title: "Marché",
        filterLabel: "Filtrer",
        propertyCard: {
          verkaufen: "Vendre la propriété",
          kaufen: "Acheter",
          details: "Voir les détails",
          priceOffer: "Envoyer une offre de prix"
        },
        buyerForm: {
          title: "Saisir les informations de l'acheteur",
          vorname: "Prénom",
          nachname: "Nom",
          strasse: "Rue",
          hausnummer: "Numéro de maison",
          plz: "Code postal",
          ort: "Ville",
          land: "Pays",
          telefon: "Téléphone",
          email: "E-mail",
          submit: "Envoyer",
          cancel: "Annuler"
        },
        priceOfferForm: {
          title: "Saisir votre offre de prix",
          offerPrice: "Votre offre (en €)",
          submit: "Envoyer l'offre",
          cancel: "Annuler"
        },
        detailModal: {
          title: "Détails de la propriété",
          close: "Fermer"
        }
      }
    },
    es: {
      marketing: {
        title: "Mercado",
        filterLabel: "Filtrar",
        propertyCard: {
          verkaufen: "Vender Propiedad",
          kaufen: "Comprar",
          details: "Ver detalles",
          priceOffer: "Enviar oferta de precio"
        },
        buyerForm: {
          title: "Ingrese la información del comprador",
          vorname: "Nombre",
          nachname: "Apellido",
          strasse: "Calle",
          hausnummer: "Número",
          plz: "Código Postal",
          ort: "Ciudad",
          land: "País",
          telefon: "Teléfono",
          email: "Correo electrónico",
          submit: "Enviar",
          cancel: "Cancelar"
        },
        priceOfferForm: {
          title: "Ingrese su oferta de precio",
          offerPrice: "Su oferta (en €)",
          submit: "Enviar oferta",
          cancel: "Cancelar"
        },
        detailModal: {
          title: "Detalles de la propiedad",
          close: "Cerrar"
        }
      }
    },
    it: {
      marketing: {
        title: "Mercato",
        filterLabel: "Filtra",
        propertyCard: {
          verkaufen: "Vendi Proprietà",
          kaufen: "Acquista",
          details: "Visualizza dettagli",
          priceOffer: "Invia offerta di prezzo"
        },
        buyerForm: {
          title: "Inserisci le informazioni dell'acquirente",
          vorname: "Nome",
          nachname: "Cognome",
          strasse: "Via",
          hausnummer: "Numero civico",
          plz: "CAP",
          ort: "Città",
          land: "Paese",
          telefon: "Telefono",
          email: "Email",
          submit: "Invia",
          cancel: "Annulla"
        },
        priceOfferForm: {
          title: "Inserisci la tua offerta di prezzo",
          offerPrice: "La tua offerta (in €)",
          submit: "Invia offerta",
          cancel: "Annulla"
        },
        detailModal: {
          title: "Dettagli della proprietà",
          close: "Chiudi"
        }
      }
    },
    nl: {
      marketing: {
        title: "Marktplaats",
        filterLabel: "Filter",
        propertyCard: {
          verkaufen: "Verkoop Eigendom",
          kaufen: "Kopen",
          details: "Bekijk details",
          priceOffer: "Verzend prijsvoorstel"
        },
        buyerForm: {
          title: "Voer kopergegevens in",
          vorname: "Voornaam",
          nachname: "Achternaam",
          strasse: "Straat",
          hausnummer: "Huisnummer",
          plz: "Postcode",
          ort: "Plaats",
          land: "Land",
          telefon: "Telefoon",
          email: "E-mail",
          submit: "Verzenden",
          cancel: "Annuleren"
        },
        priceOfferForm: {
          title: "Voer uw prijsvoorstel in",
          offerPrice: "Uw voorstel (in €)",
          submit: "Verzend voorstel",
          cancel: "Annuleren"
        },
        detailModal: {
          title: "Eigendomsdetails",
          close: "Sluiten"
        }
      }
    },
    pl: {
      marketing: {
        title: "Rynek",
        filterLabel: "Filtruj",
        propertyCard: {
          verkaufen: "Sprzedaj Nieruchomość",
          kaufen: "Kup",
          details: "Zobacz szczegóły",
          priceOffer: "Wyślij ofertę cenową"
        },
        buyerForm: {
          title: "Wprowadź dane kupującego",
          vorname: "Imię",
          nachname: "Nazwisko",
          strasse: "Ulica",
          hausnummer: "Numer domu",
          plz: "Kod pocztowy",
          ort: "Miasto",
          land: "Kraj",
          telefon: "Telefon",
          email: "E-mail",
          submit: "Wyślij",
          cancel: "Anuluj"
        },
        priceOfferForm: {
          title: "Wprowadź ofertę cenową",
          offerPrice: "Twoja oferta (w €)",
          submit: "Wyślij ofertę",
          cancel: "Anuluj"
        },
        detailModal: {
          title: "Szczegóły nieruchomości",
          close: "Zamknij"
        }
      }
    }
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
    setFilters({ ...filters, [e.target.name]: e.target.value });
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

  // Wenn "Preisangebot senden" gedrückt wird, öffne das Preisangebot-Formular
  const handlePriceOfferClick = (property: Property) => {
    setSelectedProperty(property);
    setShowPriceOfferForm(true);
  };

  // Detail-Modal: Öffne, wenn auf "Details anzeigen" geklickt wird
  const handleShowDetails = (property: Property) => {
    setSelectedDetail(property);
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
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === selectedProperty.id
            ? { ...prop, status: "verkauft", buyer: buyerInfo }
            : prop
        )
      );
      setShowBuyerForm(false);
      setBuyerInfo({ vorname: "", nachname: "", strasse: "", hausnummer: "", plz: "", ort: "", land: "", telefon: "", email: "" });
    } else {
      alert("Kauf fehlgeschlagen: " + data.message);
    }
  };

  // Preisangebot-Formular absenden: API-Aufruf zum Senden des Preisangebots (z.B. /api/priceOffer)
  const handlePriceOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;
    const res = await fetch("/api/priceOffer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: selectedProperty.id,
        offerPrice: priceOffer
      })
    });
    const data = await res.json();
    if (data.success) {
      alert("Ihr Preisangebot wurde gesendet!");
      setShowPriceOfferForm(false);
      setPriceOffer("");
    } else {
      alert("Angebot fehlgeschlagen: " + data.message);
    }
  };

  // Neuer State für Preisangebot-Modal und Detail-Modal
  const [selectedDetail, setSelectedDetail] = useState<Property | null>(null);
  const [showPriceOfferForm, setShowPriceOfferForm] = useState(false);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>

      {/* Filterbereich */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t.filterLabel}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <input type="text" name="land" placeholder="Land" className="border p-2" value={filters.land} onChange={handleFilterChange} />
          <input type="text" name="ort" placeholder="Ort" className="border p-2" value={filters.ort} onChange={handleFilterChange} />
          <input type="text" name="plz" placeholder="PLZ" className="border p-2" value={filters.plz} onChange={handleFilterChange} />
          <input type="text" name="baujahr" placeholder="Baujahr" className="border p-2" value={filters.baujahr} onChange={handleFilterChange} />
          <input type="number" name="preisVon" placeholder="Preis von" className="border p-2" value={filters.preisVon} onChange={handleFilterChange} />
          <input type="number" name="preisBis" placeholder="Preis bis" className="border p-2" value={filters.preisBis} onChange={handleFilterChange} />
        </div>
      </div>

      {/* Immobilienliste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map((property) => (
          <div key={property.id} className="relative border rounded p-4 shadow">
            {/* "Immobilie Verkaufen"-Button oben rechts */}
            <div className="absolute top-2 right-2">
              <Link href="/sell">
                <a className="bg-yellow-500 text-white px-2 py-1 rounded">{t.propertyCard.verkaufen}</a>
              </Link>
            </div>
            <h2 className="text-2xl font-semibold cursor-pointer" onClick={() => handleShowDetails(property)}>
              {property.title}
            </h2>
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
                <img key={index} src={img} alt={`Bild ${index + 1}`} className="w-32 h-32 object-cover rounded" />
              ))}
            </div>
            {/* Aktions-Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => handleBuyClick(property)} className="bg-green-600 text-white px-4 py-2 rounded">
                {t.propertyCard.kaufen}
              </button>
              <button onClick={() => handlePriceOfferClick(property)} className="bg-blue-600 text-white px-4 py-2 rounded">
                {t.propertyCard.priceOffer}
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
                <input type="text" className="w-full border p-2" value={buyerInfo.vorname} onChange={(e) => setBuyerInfo({ ...buyerInfo, vorname: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.nachname}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.nachname} onChange={(e) => setBuyerInfo({ ...buyerInfo, nachname: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.strasse}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.strasse} onChange={(e) => setBuyerInfo({ ...buyerInfo, strasse: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.hausnummer}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.hausnummer} onChange={(e) => setBuyerInfo({ ...buyerInfo, hausnummer: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.plz}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.plz} onChange={(e) => setBuyerInfo({ ...buyerInfo, plz: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.ort}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.ort} onChange={(e) => setBuyerInfo({ ...buyerInfo, ort: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.land}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.land} onChange={(e) => setBuyerInfo({ ...buyerInfo, land: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label>{t.buyerForm.telefon}:</label>
                <input type="text" className="w-full border p-2" value={buyerInfo.telefon} onChange={(e) => setBuyerInfo({ ...buyerInfo, telefon: e.target.value })} required />
              </div>
              <div className="mb-4">
                <label>{t.buyerForm.email}:</label>
                <input type="email" className="w-full border p-2" value={buyerInfo.email} onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })} required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowBuyerForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  {t.buyerForm.cancel}
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {t.buyerForm.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preisangebot-Formular (Modal) */}
      {showPriceOfferForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">{t.priceOfferForm.title}</h2>
            <form onSubmit={handlePriceOfferSubmit}>
              <div className="mb-4">
                <label>{t.priceOfferForm.offerPrice}:</label>
                <input type="number" className="w-full border p-2" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPriceOfferForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  {t.priceOfferForm.cancel}
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {t.priceOfferForm.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail-Modal für Immobilie */}
      {selectedDetail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded max-w-2xl w-full relative">
            <button onClick={() => setSelectedDetail(null)} className="absolute top-2 right-2 text-gray-600 text-xl">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{t.detailModal.title}</h2>
            <h3 className="text-xl font-semibold">{selectedDetail.title}</h3>
            <p className="mt-2">{selectedDetail.description}</p>
            <p className="mt-2 text-sm">
              Baujahr: {selectedDetail.baujahr} | Grundstück: {selectedDetail.grundstueck} | Zimmer: {selectedDetail.zimmer}
            </p>
            <p className="mt-2">
              Ort: {selectedDetail.ort} | Preis: €{selectedDetail.preis}
            </p>
            <div className="mt-2 flex overflow-x-auto space-x-2">
              {selectedDetail.images.map((img, index) => (
                <img key={index} src={img} alt={`Bild ${index + 1}`} className="w-40 h-40 object-cover rounded" />
              ))}
            </div>
            {selectedDetail.documents && selectedDetail.documents.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Dokumente:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {selectedDetail.documents.map((doc, index) => (
                    <li key={index}><a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Dokument {index + 1}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
