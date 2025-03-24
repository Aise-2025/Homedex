// pages/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Sprache wird über State verwaltet, initial "de" (Deutsch)
  const [language, setLanguage] = useState("de");

  // Mapping für individuelle Kosteninformationen je Sprache (Markt)
  const costData: { [key: string]: { headline: string; text: string } } = {
    de: {
      headline: "Maklerkosten in Deutschland vs. Homedex",
      text: "In Deutschland liegen die üblichen Maklerprovisionen häufig zwischen 3% und 7% für Käufer und Verkäufer. Mit Homedex zahlen beide Parteien jeweils nur 1% – das heißt, insgesamt 2%.",
    },
    en: {
      headline: "Real Estate Agent Fees in the UK vs. Homedex",
      text: "In the UK, traditional fees typically range between 1% and 3% for both buyers and sellers. With Homedex, both parties pay only 1%, resulting in significant savings.",
    },
    fr: {
      headline: "Frais d'agence en France vs. Homedex",
      text: "En France, les commissions traditionnelles peuvent atteindre entre 5% et 8% (z. B. souvent nur vom Verkäufer berechnet). Chez Homedex, le vendeur paie 1% – ou 2% si applicable – assurant ainsi une approche équitable.",
    },
    es: {
      headline: "Comisiones inmobiliarias en España vs. Homedex",
      text: "En España, las comisiones suelen oscilar entre el 3% y el 6% para ambas partes. Con Homedex, tanto el comprador como el vendedor pagan solo el 1%, totalizando un 2%.",
    },
    it: {
      headline: "Commissioni immobiliari in Italia vs. Homedex",
      text: "In Italia, le commissioni tradizionali possono variare dal 2% al 4% (solitamente a carico del venditore). Con Homedex, acquirente e venditore pagano ciascuno solo l'1%, per un totale del 2%.",
    },
    nl: {
      headline: "Vastgoedmakelaarskosten in Nederland vs. Homedex",
      text: "In Nederland bedragen die herkomstelijk gebruikelijke makelaarskosten vaak 2% tot 3% voor zowel koper als verkoper. Bij Homedex betaalt elke partij slechts 1%, wat tot lagere kosten leidt.",
    },
  };

  // Handler für die Sprachumschaltung
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <div className="logo text-2xl font-bold">Homedex</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a className="hover:underline">Startseite</a>
              </Link>
            </li>
            <li>
              <Link href="/submit">
                <a className="hover:underline">Immobilie einreichen</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="hover:underline">Login</a>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <a className="hover:underline">Admin Dashboard</a>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Sprachumschaltung */}
        <div>
          <select
            className="border p-1 rounded"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
          </select>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Verkaufen Sie Ihre Immobilie digital – schnell, transparent und kosteneffizient!
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Mit Homedex setzen Sie auf ein innovatives Online-Modell, das Ihnen den Verkauf Ihrer Immobilie stressfrei ermöglicht. Dank hochwertiger Bilder, 360°-Touren und transparenter Prozesse sparen Sie Zeit und Geld – ganz ohne lästige Besichtigungen.
        </p>

        {/* Dynamischer Kostenvergleich je nach gewählter Sprache */}
        <section className="mb-10 max-w-2xl mx-auto text-left">
          <h2 className="text-2xl font-bold mb-2">{costData[language].headline}</h2>
          <p className="text-lg">{costData[language].text}</p>
        </section>

        {/* Call-to-Action */}
        <Link href="/submit">
          <a className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Jetzt Immobilie bewerten lassen
          </a>
        </Link>

        {/* Optional: Bildgalerie / Beispielbild */}
        <div className="mt-10">
          <img
            src="/images/immobilien-verkauf.jpg"
            alt="Immobilienverkauf digital"
            className="mx-auto rounded shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center border-t pt-4">
        <p>© 2025 Homedex. Alle Rechte vorbehalten.</p>
        <p className="mt-2">
          <Link href="/privacy">
            <a className="underline mr-2">Datenschutz</a>
          </Link>
          |
          <Link href="/impressum">
            <a className="underline ml-2">Impressum</a>
          </Link>
        </p>
      </footer>
    </div>
  );
}
