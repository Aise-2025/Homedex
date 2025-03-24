// pages/dashboard.tsx
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Property {
  id: number;
  title: string;
  description: string;
  images: string[]; // URLs der Bilder
  status: string;   // z.B. "vermarkten", "nicht vermarkten", "verkauft"
  price: number;
  buyer?: string;   // Käufer-Daten (z. B. Name/E-Mail)
  seller?: string;  // Verkäufer-Daten (z. B. Name/E-Mail)
}

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  // Lade die Immobilien aus dem API-Endpunkt /api/properties
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

  // Funktion zum Aktualisieren des Status einer Immobilie
  const updatePropertyStatus = async (id: number, newStatus: string) => {
    const res = await fetch("/api/properties/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    const data = await res.json();
    if (data.success) {
      setProperties((prev) =>
        prev.map((prop) => (prop.id === id ? { ...prop, status: newStatus } : prop))
      );
    }
  };

  // KI‑Button: Ruft den Endpunkt /api/ki auf, um den Preis zu berechnen
  const calculatePrice = async (id: number) => {
    const property = properties.find((p) => p.id === id);
    if (!property) return;
    const res = await fetch("/api/ki", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property }),
    });
    const data = await res.json();
    if (data.success) {
      setProperties((prev) =>
        prev.map((prop) => (prop.id === id ? { ...prop, price: data.price } : prop))
      );
    }
  };

  // Funktion zur Generierung einer PDF-Rechnung für verkaufte Immobilien
  const generateInvoice = (property: Property) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("Rechnung", 14, 22);

    // Verkäufer und Käufer
    doc.setFontSize(12);
    doc.text("Verkäufer: " + (property.seller || "Nicht verfügbar"), 14, 32);
    doc.text("Käufer: " + (property.buyer || "Nicht verfügbar"), 14, 40);

    // Immobilien-Daten
    doc.text("Immobilie: " + property.title, 14, 50);
    doc.text("Beschreibung: " + property.description, 14, 58);
    doc.text("Verkaufspreis: €" + property.price, 14, 66);

    // Gebührenberechnung: 1% für Käufer und 1% für Verkäufer
    const feeSeller = Math.round(property.price * 0.01);
    const feeBuyer = Math.round(property.price * 0.01);
    doc.text("Gebühr Verkäufer (1%): €" + feeSeller, 14, 74);
    doc.text("Gebühr Käufer (1%): €" + feeBuyer, 14, 82);
    doc.text("Gesamtgebühren: €" + (feeSeller + feeBuyer), 14, 90);

    // Gesamtbetrag für den Käufer (Kaufpreis + Käufergebühr)
    const totalAmount = property.price + feeBuyer;
    doc.text("Gesamtbetrag (Käufer): €" + totalAmount, 14, 98);

    // Footer
    doc.setFontSize(10);
    doc.text("Vielen Dank für Ihren Einkauf!", 14, 110);

    // PDF speichern
    doc.save(`Rechnung_Immobilie_${property.id}.pdf`);
  };

  // Filtere verkaufte Immobilien
  const soldProperties = properties.filter((p) => p.status === "verkauft");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mitarbeiter-Dashboard</h1>
      
      {/* Bereich für verfügbare Immobilien */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Verfügbare Immobilien</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.filter((p) => p.status !== "verkauft").map((property) => (
            <div key={property.id} className="border rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="mt-2">{property.description}</p>
              {/* Bilderbereich */}
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
              <p className="mt-2">Preis: €{property.price}</p>
              <p className="mt-2">
                Status:{" "}
                <span className={property.status === "verkauft" ? "text-green-600 font-bold" : ""}>
                  {property.status}
                </span>
              </p>
              <p className="mt-2 text-sm">Gebühren: Käufer 1% | Verkäufer 1%</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => updatePropertyStatus(property.id, "vermarkten")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Vermarkten
                </button>
                <button
                  onClick={() => updatePropertyStatus(property.id, "nicht vermarkten")}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Nicht Vermarkten
                </button>
                <button
                  onClick={() => updatePropertyStatus(property.id, "verkauft")}
                  className={`px-3 py-1 rounded text-white ${
                    property.status === "verkauft" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  Verkauft
                </button>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => calculatePrice(property.id)}
                  className="bg-purple-500 text-white px-3 py-1 rounded"
                >
                  Preis berechnen (KI)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bereich für verkaufte Immobilien */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Verkaufte Immobilien</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soldProperties.map((property) => (
            <div key={property.id} className="border rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="mt-2">{property.description}</p>
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
              <p className="mt-2">Preis: €{property.price}</p>
              <p className="mt-2 text-sm">Gebühren: Käufer 1% | Verkäufer 1%</p>
              <div className="mt-4">
                <button
                  onClick={() => generateInvoice(property)}
                  className="bg-purple-500 text-white px-3 py-1 rounded"
                >
                  Rechnung generieren
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
