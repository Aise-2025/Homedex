// pages/sell.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface SellFormData {
  title: string;
  description: string;
  baujahr: number | "";
  grundstueck: string;
  zimmer: number | "";
  ort: string;
  land: string;
  preis: number | "";
  nebkosten: string;
  badAnzahl: number | "";
  kuecheAnzahl: number | "";
  wohnzimmerAnzahl: number | "";
  kinderzimmerAnzahl: number | "";
}

interface Translations {
  sell: {
    title: string;
    form: {
      propertyTitle: string;
      description: string;
      baujahr: string;
      grundstueck: string;
      zimmer: string;
      ort: string;
      land: string;
      preis: string;
      nebkosten: string;
      bad: string;
      kueche: string;
      wohnzimmer: string;
      kinderzimmer: string;
      uploadHint: string;
      submit: string;
      cancel: string;
      facade: string;
      roof: string;
      plot: string;
      documents: string;
    };
    header: {
      sellProperty: string;
    };
  };
}

export default function SellPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("de");
  const [formData, setFormData] = useState<SellFormData>({
    title: "",
    description: "",
    baujahr: "",
    grundstueck: "",
    zimmer: "",
    ort: "",
    land: "",
    preis: "",
    nebkosten: "",
    badAnzahl: "",
    kuecheAnzahl: "",
    wohnzimmerAnzahl: "",
    kinderzimmerAnzahl: ""
  });

  // File-Uploads: Für Fassade, Dach, Grundstück und für Raumtypen sowie Dokumente
  const [facadeFiles, setFacadeFiles] = useState<FileList | null>(null);
  const [roofFiles, setRoofFiles] = useState<FileList | null>(null);
  const [plotFiles, setPlotFiles] = useState<FileList | null>(null);
  const [badFiles, setBadFiles] = useState<FileList | null>(null);
  const [kuecheFiles, setKuecheFiles] = useState<FileList | null>(null);
  const [wohnzimmerFiles, setWohnzimmerFiles] = useState<FileList | null>(null);
  const [kinderzimmerFiles, setKinderzimmerFiles] = useState<FileList | null>(null);
  const [documentFiles, setDocumentFiles] = useState<FileList | null>(null);

  // Übersetzungen für Sell-Formular in den unterstützten Sprachen
  const translations: { [key: string]: Translations } = {
    de: {
      sell: {
        title: "Immobilie inserieren",
        form: {
          propertyTitle: "Titel der Immobilie",
          description: "Beschreibung",
          baujahr: "Baujahr",
          grundstueck: "Grundstück (Größe/Fläche)",
          zimmer: "Zimmeranzahl (gesamt)",
          ort: "Ort",
          land: "Land",
          preis: "Preis (in €)",
          nebkosten: "Nebenkosten (z. B. Maklerprovision, Grunderwerbsteuer)",
          bad: "Anzahl Badezimmer",
          kueche: "Anzahl Küchen",
          wohnzimmer: "Anzahl Wohnzimmer",
          kinderzimmer: "Anzahl Kinderzimmer",
          uploadHint: "Bitte laden Sie 4 Bilder hoch",
          submit: "Immobilie inserieren",
          cancel: "Abbrechen",
          facade: "Fotos Fassade",
          roof: "Fotos Dach",
          plot: "Fotos Grundstück",
          documents: "Dokumente (z.B. Energieausweis, Grundbuchauszug)"
        },
        header: {
          sellProperty: "Immobilie verkaufen"
        }
      }
    },
    en: {
      sell: {
        title: "List Your Property",
        form: {
          propertyTitle: "Property Title",
          description: "Description",
          baujahr: "Year Built",
          grundstueck: "Plot (Size/Area)",
          zimmer: "Total Number of Rooms",
          ort: "City",
          land: "Country",
          preis: "Price (in €)",
          nebkosten: "Additional Costs (e.g., agent fee, transfer tax)",
          bad: "Number of Bathrooms",
          kueche: "Number of Kitchens",
          wohnzimmer: "Number of Living Rooms",
          kinderzimmer: "Number of Children's Rooms",
          uploadHint: "Please upload 4 images each",
          submit: "List Property",
          cancel: "Cancel",
          facade: "Facade Photos",
          roof: "Roof Photos",
          plot: "Plot Photos",
          documents: "Documents (e.g., energy certificate, land register)"
        },
        header: {
          sellProperty: "Sell Your Property"
        }
      }
    },
    fr: {
      sell: {
        title: "Mettre en vente votre propriété",
        form: {
          propertyTitle: "Titre de la propriété",
          description: "Description",
          baujahr: "Année de construction",
          grundstueck: "Terrain (Taille/Surface)",
          zimmer: "Nombre total de pièces",
          ort: "Ville",
          land: "Pays",
          preis: "Prix (en €)",
          nebkosten: "Coûts supplémentaires (ex : commission, taxe de transfert)",
          bad: "Nombre de salles de bain",
          kueche: "Nombre de cuisines",
          wohnzimmer: "Nombre de salons",
          kinderzimmer: "Nombre de chambres d'enfants",
          uploadHint: "Veuillez télécharger 4 images chacune",
          submit: "Mettre en vente",
          cancel: "Annuler",
          facade: "Photos de la façade",
          roof: "Photos du toit",
          plot: "Photos du terrain",
          documents: "Documents (ex : certificat énergétique, extrait de cadastre)"
        },
        header: {
          sellProperty: "Vendre votre propriété"
        }
      }
    },
    es: {
      sell: {
        title: "Publica tu propiedad",
        form: {
          propertyTitle: "Título de la propiedad",
          description: "Descripción",
          baujahr: "Año de construcción",
          grundstueck: "Terreno (Tamaño/Área)",
          zimmer: "Número total de habitaciones",
          ort: "Ciudad",
          land: "País",
          preis: "Precio (en €)",
          nebkosten: "Costos adicionales (ej. comisión, impuesto de transferencia)",
          bad: "Número de baños",
          kueche: "Número de cocinas",
          wohnzimmer: "Número de salones",
          kinderzimmer: "Número de habitaciones infantiles",
          uploadHint: "Por favor, suba 4 imágenes cada uno",
          submit: "Publicar propiedad",
          cancel: "Cancelar",
          facade: "Fotos de la fachada",
          roof: "Fotos del techo",
          plot: "Fotos del terreno",
          documents: "Documentos (por ejemplo, certificado energético, registro de la propiedad)"
        },
        header: {
          sellProperty: "Vender tu propiedad"
        }
      }
    },
    it: {
      sell: {
        title: "Inserisci la tua proprietà",
        form: {
          propertyTitle: "Titolo della proprietà",
          description: "Descrizione",
          baujahr: "Anno di costruzione",
          grundstueck: "Terreno (Dimensioni/Area)",
          zimmer: "Numero totale di stanze",
          ort: "Città",
          land: "Paese",
          preis: "Prezzo (in €)",
          nebkosten: "Costi aggiuntivi (es. commissione, tassa di trasferimento)",
          bad: "Numero di bagni",
          kueche: "Numero di cucine",
          wohnzimmer: "Numero di salotti",
          kinderzimmer: "Numero di camere per bambini",
          uploadHint: "Si prega di caricare 4 immagini ciascuno",
          submit: "Inserisci proprietà",
          cancel: "Annulla",
          facade: "Foto della facciata",
          roof: "Foto del tetto",
          plot: "Foto del terreno",
          documents: "Documenti (es. certificato energetico, estratto catastale)"
        },
        header: {
          sellProperty: "Vendi la tua proprietà"
        }
      }
    },
    nl: {
      sell: {
        title: "Plaats uw vastgoed",
        form: {
          propertyTitle: "Titel van het vastgoed",
          description: "Beschrijving",
          baujahr: "Bouwjaar",
          grundstueck: "Perceel (Grootte/Oppervlakte)",
          zimmer: "Totaal aantal kamers",
          ort: "Stad",
          land: "Land",
          preis: "Prijs (in €)",
          nebkosten: "Aanvullende kosten (bijv. makelaarscourtage, overdrachtsbelasting)",
          bad: "Aantal badkamers",
          kueche: "Aantal keukens",
          wohnzimmer: "Aantal woonkamers",
          kinderzimmer: "Aantal kinderkamers",
          uploadHint: "Upload 4 afbeeldingen per categorie",
          submit: "Vastgoed plaatsen",
          cancel: "Annuleren",
          facade: "Foto's van de gevel",
          roof: "Foto's van het dak",
          plot: "Foto's van het perceel",
          documents: "Documenten (bijv. energiecertificaat, kadasteruittreksel)"
        },
        header: {
          sellProperty: "Verkoop uw vastgoed"
        }
      }
    },
    pl: {
      sell: {
        title: "Wystaw swoją nieruchomość",
        form: {
          propertyTitle: "Tytuł nieruchomości",
          description: "Opis",
          baujahr: "Rok budowy",
          grundstueck: "Działka (Wielkość/Obszar)",
          zimmer: "Łączna liczba pokoi",
          ort: "Miasto",
          land: "Kraj",
          preis: "Cena (w €)",
          nebkosten: "Koszty dodatkowe (np. prowizja, podatek od nieruchomości)",
          bad: "Liczba łazienek",
          kueche: "Liczba kuchni",
          wohnzimmer: "Liczba salonów",
          kinderzimmer: "Liczba pokoi dziecięcych",
          uploadHint: "Proszę przesłać 4 zdjęcia każdej kategorii",
          submit: "Wystaw nieruchomość",
          cancel: "Anuluj",
          facade: "Zdjęcia elewacji",
          roof: "Zdjęcia dachu",
          plot: "Zdjęcia działki",
          documents: "Dokumenty (np. świadectwo energetyczne, wypis z księgi wieczystej)"
        },
        header: {
          sellProperty: "Sprzedaj swoją nieruchomość"
        }
      }
    }
  };

  const t = translations[language].sell;

  // Sprache aus localStorage laden (falls noch nicht geladen)
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

  const router = useRouter();

  // Handler für Formularfeldänderungen
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler für File-Uploads (Mehrfachdateien)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFiles: (files: FileList | null) => void) => {
    setFiles(e.target.files);
  };

  // Formular absenden: API-Aufruf zu /api/sellProperty
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Erstelle FormData zum Versenden der Textdaten und Dateien
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("baujahr", formData.baujahr.toString());
    dataToSend.append("grundstueck", formData.grundstueck);
    dataToSend.append("zimmer", formData.zimmer.toString());
    dataToSend.append("ort", formData.ort);
    dataToSend.append("land", formData.land);
    dataToSend.append("preis", formData.preis.toString());
    dataToSend.append("nebkosten", formData.nebkosten);
    dataToSend.append("badAnzahl", formData.badAnzahl.toString());
    dataToSend.append("kuecheAnzahl", formData.kuecheAnzahl.toString());
    dataToSend.append("wohnzimmerAnzahl", formData.wohnzimmerAnzahl.toString());
    dataToSend.append("kinderzimmerAnzahl", formData.kinderzimmerAnzahl.toString());

    // Dateien anhängen: Fassade, Dach, Grundstück
    if (facadeFiles) {
      for (let i = 0; i < facadeFiles.length; i++) {
        dataToSend.append("facadeFiles", facadeFiles[i]);
      }
    }
    if (roofFiles) {
      for (let i = 0; i < roofFiles.length; i++) {
        dataToSend.append("roofFiles", roofFiles[i]);
      }
    }
    if (plotFiles) {
      for (let i = 0; i < plotFiles.length; i++) {
        dataToSend.append("plotFiles", plotFiles[i]);
      }
    }
    // Dateien für Raumtypen anhängen
    if (badFiles) {
      for (let i = 0; i < badFiles.length; i++) {
        dataToSend.append("badFiles", badFiles[i]);
      }
    }
    if (kuecheFiles) {
      for (let i = 0; i < kuecheFiles.length; i++) {
        dataToSend.append("kuecheFiles", kuecheFiles[i]);
      }
    }
    if (wohnzimmerFiles) {
      for (let i = 0; i < wohnzimmerFiles.length; i++) {
        dataToSend.append("wohnzimmerFiles", wohnzimmerFiles[i]);
      }
    }
    if (kinderzimmerFiles) {
      for (let i = 0; i < kinderzimmerFiles.length; i++) {
        dataToSend.append("kinderzimmerFiles", kinderzimmerFiles[i]);
      }
    }
    // Dokumente anhängen
    if (documentFiles) {
      for (let i = 0; i < documentFiles.length; i++) {
        dataToSend.append("documentFiles", documentFiles[i]);
      }
    }

    const res = await fetch("/api/sellProperty", {
      method: "POST",
      body: dataToSend
    });
    const result = await res.json();
    if (result.success) {
      alert("Immobilie wurde erfolgreich inseriert!");
      router.push("/marketing");
    } else {
      alert("Fehler: " + result.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-2xl font-bold">{t.header.sellProperty}</h1>
        <div>
          <select
            className="border p-1 rounded"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              localStorage.setItem("language", e.target.value);
            }}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
          </select>
        </div>
      </header>
      <h2 className="text-3xl font-bold mt-6 mb-4">{t.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder={t.form.propertyTitle} className="w-full p-2 border rounded" value={formData.title} onChange={handleInputChange} required />
        <textarea name="description" placeholder={t.form.description} className="w-full p-2 border rounded" value={formData.description} onChange={handleInputChange} required />
        <input type="number" name="baujahr" placeholder={t.form.baujahr} className="w-full p-2 border rounded" value={formData.baujahr} onChange={handleInputChange} required />
        <input type="text" name="grundstueck" placeholder={t.form.grundstueck} className="w-full p-2 border rounded" value={formData.grundstueck} onChange={handleInputChange} required />
        <input type="number" name="zimmer" placeholder={t.form.zimmer} className="w-full p-2 border rounded" value={formData.zimmer} onChange={handleInputChange} required />
        <input type="text" name="ort" placeholder={t.form.ort} className="w-full p-2 border rounded" value={formData.ort} onChange={handleInputChange} required />
        <input type="text" name="land" placeholder={t.form.land} className="w-full p-2 border rounded" value={formData.land} onChange={handleInputChange} required />
        <input type="number" name="preis" placeholder={t.form.preis} className="w-full p-2 border rounded" value={formData.preis} onChange={handleInputChange} required />
        <input type="text" name="nebkosten" placeholder={t.form.nebkosten} className="w-full p-2 border rounded" value={formData.nebkosten} onChange={handleInputChange} required />
        <input type="number" name="badAnzahl" placeholder={t.form.bad} className="w-full p-2 border rounded" value={formData.badAnzahl} onChange={handleInputChange} required />
        <input type="number" name="kuecheAnzahl" placeholder={t.form.kueche} className="w-full p-2 border rounded" value={formData.kuecheAnzahl} onChange={handleInputChange} required />
        <input type="number" name="wohnzimmerAnzahl" placeholder={t.form.wohnzimmer} className="w-full p-2 border rounded" value={formData.wohnzimmerAnzahl} onChange={handleInputChange} required />
        <input type="number" name="kinderzimmerAnzahl" placeholder={t.form.kinderzimmer} className="w-full p-2 border rounded" value={formData.kinderzimmerAnzahl} onChange={handleInputChange} required />
        
        {/* File-Uploads für Fotos und Dokumente */}
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.facade}</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setFacadeFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.roof}</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setRoofFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.plot}</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setPlotFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.documents}</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, setDocumentFiles)} required />
        </div>
        {/* File-Uploads für Raumtypen */}
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.bad} ({t.form.uploadHint})</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setBadFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.kueche} ({t.form.uploadHint})</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setKuecheFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.wohnzimmer} ({t.form.uploadHint})</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setWohnzimmerFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.kinderzimmer} ({t.form.uploadHint})</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setKinderzimmerFiles)} required />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => router.push("/marketing")}>
            {t.form.cancel}
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {t.form.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

