
// pages/submit.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

interface SubmitData {
  land: string;
  ort: string;
  plz: string;
}

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SubmitData>({
    land: "",
    ort: "",
    plz: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Speichere die eingegebenen Vorab-Daten im localStorage
    localStorage.setItem("preliminaryData", JSON.stringify(formData));
    // Weiterleitung zur Login-Seite
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vorab-Daten eingeben</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="land" className="block mb-1">Land</label>
          <input
            type="text"
            id="land"
            name="land"
            value={formData.land}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="ort" className="block mb-1">Ort</label>
          <input
            type="text"
            id="ort"
            name="ort"
            value={formData.ort}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="plz" className="block mb-1">PLZ</label>
          <input
            type="text"
            id="plz"
            name="plz"
            value={formData.plz}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Absenden
        </button>
      </form>
    </div>
  );
}
