// pages/dashboard.tsx
import React, { useEffect, useState } from "react";

interface Property {
  id: number;
  title: string;
  description: string;
  images: string[]; // URLs der Bilder
  status: string;   // z.B. "vermarkten", "nicht vermarkten", "verkauft"
  price: number;
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mitarbeiter-Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded p-4 shadow">
            <h2 className="text-2xl font-semibold">{property.title}</h2>
            <p className="mt-2">{property.description}</p>
            {/* Bilderbereich (einfache horizontale Scroll-Ansicht) */}
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
            <p className="mt-2">
              Status:{" "}
              <span className={property.status === "verkauft" ? "text-green-600 font-bold" : ""}>
                {property.status}
              </span>
            </p>
            <p className="mt-2">Preis: €{property.price}</p>
            {/* Aktions-Buttons */}
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
            {/* KI-Button */}
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
  );
}
