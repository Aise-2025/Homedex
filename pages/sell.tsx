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
      uploadFacade: string;
      uploadRoof: string;
      uploadPlot: string;
      uploadDocuments: string;
      uploadRooms: string;
      submit: string;
      cancel: string;
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

  // Hier kommen deine File-Uploads (unverändert)
  // Für Fassade und Dach: genau 4 Bilder jeweils
  const [facadeFiles, setFacadeFiles] = useState<FileList | null>(null);
  const [roofFiles, setRoofFiles] = useState<FileList | null>(null);
  // Für Grundstück: 1 Bild oder 2 Bilder/Videos
  const [plotFiles, setPlotFiles] = useState<FileList | null>(null);
  // Für Raumtypen: hier erlauben wir 1 Bild, optional auch ein Video (nutze dasselbe Input-Feld)
  const [badFiles, setBadFiles] = useState<FileList | null>(null);
  const [kuecheFiles, setKuecheFiles] = useState<FileList | null>(null);
  const [wohnzimmerFiles, setWohnzimmerFiles] = useState<FileList | null>(null);
  const [kinderzimmerFiles, setKinderzimmerFiles] = useState<FileList | null>(null);
  // Dokumentenupload (z. B. Energieausweis, Grundbuchauszug)
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
          uploadFacade: "Bitte laden Sie 4 Bilder für die Fassade hoch",
          uploadRoof: "Bitte laden Sie 4 Bilder für das Dach hoch",
          uploadPlot: "Bitte laden Sie 1-2 Bilder (oder ein Video) für das Grundstück hoch",
          uploadDocuments: "Bitte laden Sie die Dokumente hoch (z.B. Energieausweis, Grundbuchauszug)",
          uploadRooms: "Bitte laden Sie je 1 Bild (oder ein Video) pro Raum hoch",
          submit: "Immobilie inserieren",
          cancel: "Abbrechen"
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
          uploadFacade: "Please upload 4 images for the facade",
          uploadRoof: "Please upload 4 images for the roof",
          uploadPlot: "Please upload 1-2 images (or a video) for the plot",
          uploadDocuments: "Please upload the documents (e.g., energy certificate, land register)",
          uploadRooms: "Please upload 1 image (or a video) per room",
          submit: "List Property",
          cancel: "Cancel"
        },
        header: {
          sellProperty: "Sell Your Property"
        }
      }
    },
    // Weitere Sprachen (fr, es, it, nl, pl) bleiben wie zuvor unverändert
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
          uploadFacade: "Veuillez télécharger 4 images pour la façade",
          uploadRoof: "Veuillez télécharger 4 images pour le toit",
          uploadPlot: "Veuillez télécharger 1-2 images (ou une vidéo) pour le terrain",
          uploadDocuments: "Veuillez télécharger les documents (ex : certificat énergétique, extrait de cadastre)",
          uploadRooms: "Veuillez télécharger 1 image (ou une vidéo) par pièce",
          submit: "Mettre en vente",
          cancel: "Annuler"
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
          uploadFacade: "Por favor, suba 4 imágenes para la fachada",
          uploadRoof: "Por favor, suba 4 imágenes para el techo",
          uploadPlot: "Por favor, suba 1-2 imágenes (o un video) para el terreno",
          uploadDocuments: "Por favor, suba los documentos (ej., certificado energético, registro de la propiedad)",
          uploadRooms: "Por favor, suba 1 imagen (o un video) por habitación",
          submit: "Publicar propiedad",
          cancel: "Cancelar"
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
          uploadFacade: "Si prega di caricare 4 immagini per la facciata",
          uploadRoof: "Si prega di caricare 4 immagini per il tetto",
          uploadPlot: "Si prega di caricare 1-2 immagini (o un video) per il terreno",
          uploadDocuments: "Si prega di caricare i documenti (es. certificato energetico, estratto catastale)",
          uploadRooms: "Si prega di caricare 1 immagine (o un video) per stanza",
          submit: "Inserisci proprietà",
          cancel: "Annulla"
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
          uploadFacade: "Upload 4 afbeeldingen voor de gevel",
          uploadRoof: "Upload 4 afbeeldingen voor het dak",
          uploadPlot: "Upload 1-2 afbeeldingen (of een video) voor het perceel",
          uploadDocuments: "Upload documenten (bijv. energiecertificaat, kadasteruittreksel)",
          uploadRooms: "Upload 1 afbeelding (of een video) per kamer",
          submit: "Vastgoed plaatsen",
          cancel: "Annuleren"
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
          uploadFacade: "Proszę przesłać 4 zdjęcia elewacji",
          uploadRoof: "Proszę przesłać 4 zdjęcia dachu",
          uploadPlot: "Proszę przesłać 1-2 zdjęcia (lub wideo) działki",
          uploadDocuments: "Proszę przesłać dokumenty (np. świadectwo energetyczne, wypis z księgi wieczystej)",
          uploadRooms: "Proszę przesłać 1 zdjęcie (lub wideo) na pokój",
          submit: "Wystaw nieruchomość",
          cancel: "Anuluj"
        },
        header: {
          sellProperty: "Sprzedaj swoją nieruchomość"
        }
      }
    }
  };

  const t = translations[language].sell;

  // Beim Laden von sell.tsx: Übernehme Vorab-Daten aus localStorage, falls vorhanden
  useEffect(() => {
    const preliminaryData = localStorage.getItem("preliminaryData");
    if (preliminaryData) {
      const parsedData = JSON.parse(preliminaryData);
      setFormData((prev) => ({
        ...prev,
        land: parsedData.land || "",
        ort: parsedData.ort || ""
        // Optional: Falls du auch PLZ übernehmen möchtest, musst du das Feld ins Interface aufnehmen.
      }));
    }
  }, []);

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
          <p className="text-sm text-gray-600">{t.form.uploadFacade}</p>
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.roof}</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileChange(e, setRoofFiles)} required />
          <p className="text-sm text-gray-600">{t.form.uploadRoof}</p>
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.plot}</label>
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => handleFileChange(e, setPlotFiles)} required />
          <p className="text-sm text-gray-600">{t.form.uploadPlot}</p>
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.documents}</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, setDocumentFiles)} required />
        </div>
        {/* File-Uploads für Raumtypen */}
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.bad} ({t.form.uploadRooms})</label>
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => handleFileChange(e, setBadFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.kueche} ({t.form.uploadRooms})</label>
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => handleFileChange(e, setKuecheFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.wohnzimmer} ({t.form.uploadRooms})</label>
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => handleFileChange(e, setWohnzimmerFiles)} required />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold">{t.form.kinderzimmer} ({t.form.uploadRooms})</label>
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => handleFileChange(e, setKinderzimmerFiles)} required />
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
