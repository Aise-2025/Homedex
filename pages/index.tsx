// pages/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Sprache wird über State verwaltet, initial "de" (Deutsch)
  const [language, setLanguage] = useState("de");

  /* 
    Manuelles Übersetzungs-Mapping für alle angezeigten Texte.
    Hierbei handelt es sich um manuell gepflegte Texte für jeden unterstützten Markt.
    Es findet keine automatische Übersetzung statt.
  */
  const translations: { [key: string]: {
    header: { home: string; submit: string; login: string; admin: string },
    hero: { title: string; description: string; cta: string },
    cost: { headline: string; text: string },
    footer: { copyright: string; privacy: string; impressum: string },
  } } = {
    de: {
      header: {
        home: "Startseite",
        submit: "Immobilie einreichen",
        login: "Login",
        admin: "Admin Dashboard"
      },
      hero: {
        title: "Verkaufen Sie Ihre Immobilie digital – schnell, transparent und kosteneffizient!",
        description: "Mit Homedex setzen Sie auf ein innovatives Online-Modell, das Ihnen den Verkauf Ihrer Immobilie stressfrei ermöglicht. Dank hochwertiger Bilder, 360°-Touren und transparenter Prozesse sparen Sie Zeit und Geld – ganz ohne lästige Besichtigungen.",
        cta: "Jetzt Immobilie bewerten lassen"
      },
      cost: {
        headline: "Maklerkosten in Deutschland vs. Homedex",
        text: "In Deutschland liegen die üblichen Maklerprovisionen häufig zwischen 3% und 7% für Käufer und Verkäufer. Mit Homedex zahlen beide Parteien jeweils nur 1% – also insgesamt 2%. Sollte in einem Markt traditionell nur eine Partei zahlen, bieten wir unser Modell für beide Seiten zu 2% an."
      },
      footer: {
        copyright: "© 2025 Homedex. Alle Rechte vorbehalten.",
        privacy: "Datenschutz",
        impressum: "Impressum"
      }
    },
    en: {
      header: {
        home: "Home",
        submit: "Submit Property",
        login: "Login",
        admin: "Admin Dashboard"
      },
      hero: {
        title: "Sell Your Property Digitally – Fast, Transparent & Cost-Efficient!",
        description: "With Homedex, you benefit from an innovative online model that allows you to sell your property without stress. High-quality images, 360° tours, and transparent processes save you time and money – without unnecessary viewings.",
        cta: "Get Your Property Valuation Now"
      },
      cost: {
        headline: "Agent Fees in the UK vs. Homedex",
        text: "In the UK, traditional agent fees typically range between 1% and 3% for both buyers and sellers. With Homedex, both parties pay only 1%, resulting in significant savings."
      },
      footer: {
        copyright: "© 2025 Homedex. All rights reserved.",
        privacy: "Privacy Policy",
        impressum: "Imprint"
      }
    },
    fr: {
      header: {
        home: "Accueil",
        submit: "Soumettre la propriété",
        login: "Connexion",
        admin: "Tableau de bord Admin"
      },
      hero: {
        title: "Vendez votre propriété de manière digitale – Rapide, Transparent et Économique!",
        description: "Avec Homedex, profitez d'un modèle en ligne innovant qui vous permet de vendre votre propriété sans stress. Des images de haute qualité, des visites virtuelles à 360° et des processus transparents vous font gagner du temps et de l'argent, sans visites inutiles.",
        cta: "Obtenez une évaluation de votre propriété"
      },
      cost: {
        headline: "Frais d'agence en France vs. Homedex",
        text: "En France, les commissions traditionnelles peuvent atteindre entre 5% et 8% (oftens uniquement à la charge du vendeur). Avec Homedex, nous appliquons un taux de 1% pour chaque partie – ou 2% insgesamt, garantissant ainsi une approche équitable."
      },
      footer: {
        copyright: "© 2025 Homedex. Tous droits réservés.",
        privacy: "Politique de confidentialité",
        impressum: "Mentions légales"
      }
    },
    es: {
      header: {
        home: "Inicio",
        submit: "Enviar Propiedad",
        login: "Acceso",
        admin: "Panel de Administración"
      },
      hero: {
        title: "¡Vende tu propiedad digitalmente – rápido, transparente y rentable!",
        description: "Con Homedex, accedes a un modelo online innovador que te permite vender tu propiedad sin estrés. Con imágenes de alta calidad, tours en 360° y procesos transparentes, ahorras tiempo y dinero sin tener que organizar visitas.",
        cta: "Obtén la valoración de tu propiedad"
      },
      cost: {
        headline: "Comisiones inmobiliarias en España vs. Homedex",
        text: "En España, las comisiones tradicionales suelen oscilar entre el 3% y el 6% para ambas partes. Con Homedex, tanto comprador como vendedor pagan solo un 1% cada uno, sumando un total del 2%."
      },
      footer: {
        copyright: "© 2025 Homedex. Todos los derechos reservados.",
        privacy: "Política de privacidad",
        impressum: "Aviso legal"
      }
    },
    // Weitere Sprachen wie it, nl etc. können hier analog hinzugefügt werden.
  };

  // Handler für die Sprachumschaltung
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  // Wähle die aktuell zu verwendenden Übersetzungen
  const t = translations[language];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <div className="logo text-2xl font-bold">Homedex</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a className="hover:underline">{t.header.home}</a>
              </Link>
            </li>
            <li>
              <Link href="/submit">
                <a className="hover:underline">{t.header.submit}</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="hover:underline">{t.header.login}</a>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <a className="hover:underline">{t.header.admin}</a>
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
            {/* Weitere Sprachen können hier hinzugefügt werden */}
          </select>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{t.hero.title}</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">{t.hero.description}</p>

        {/* Dynamischer Kostenvergleich */}
        <section className="mb-10 max-w-2xl mx-auto text-left">
          <h2 className="text-2xl font-bold mb-2">{t.cost.headline}</h2>
          <p className="text-lg">{t.cost.text}</p>
        </section>

        {/* Call-to-Action */}
        <Link href="/submit">
          <a className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            {t.hero.cta}
          </a>
        </Link>

        {/* Beispielbild */}
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
        <p>{t.footer.copyright}</p>
        <p className="mt-2">
          <Link href="/privacy">
            <a className="underline mr-2">{t.footer.privacy}</a>
          </Link>
          |
          <Link href="/impressum">
            <a className="underline ml-2">{t.footer.impressum}</a>
          </Link>
        </p>
      </footer>
    </div>
  );
}
