// pages/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [language, setLanguage] = useState("de");

  // Manuelles Übersetzungs-Mapping für alle angezeigten Texte
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
        text: "En France, les commissions traditionnelles peuvent atteindre entre 5% et 8% (souvent uniquement à la charge du vendeur). Avec Homedex, nous appliquons un taux de 1% pour chaque partie – soit 2% au total, garantissant ainsi une approche équitable."
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
        text: "En España, las comisiones tradicionales suelen oscilar entre el 3% y el 6% para ambas partes. Con Homedex, tanto comprador como vendedor pagan solo el 1% cada uno, sumando un total del 2%."
      },
      footer: {
        copyright: "© 2025 Homedex. Todos los derechos reservados.",
        privacy: "Política de privacidad",
        impressum: "Aviso legal"
      }
    },
    it: {
      header: {
        home: "Home",
        submit: "Invia Proprietà",
        login: "Accesso",
        admin: "Pannello di Amministrazione"
      },
      hero: {
        title: "Vendi la tua proprietà in modo digitale – Veloce, trasparente e conveniente!",
        description: "Con Homedex, sfrutti un modello online innovativo che ti consente di vendere la tua proprietà senza stress. Immagini di alta qualità, tour a 360° e processi trasparenti ti fanno risparmiare tempo e denaro, senza visite inutili.",
        cta: "Richiedi ora la valutazione della tua proprietà"
      },
      cost: {
        headline: "Commissioni immobiliari in Italia vs. Homedex",
        text: "In Italia, le commissioni tradizionali variano solitamente tra il 2% e il 4%, spesso a carico del venditore. Con Homedex, sia l'acquirente che il venditore pagano solo l'1% ciascuno, per un totale del 2%."
      },
      footer: {
        copyright: "© 2025 Homedex. Tutti i diritti riservati.",
        privacy: "Informativa sulla privacy",
        impressum: "Impressum"
      }
    },
    nl: {
      header: {
        home: "Home",
        submit: "Eigendom indienen",
        login: "Inloggen",
        admin: "Admin Dashboard"
      },
      hero: {
        title: "Verkoop uw vastgoed digitaal – Snel, transparant en kostenefficiënt!",
        description: "Met Homedex profiteert u van een innovatief online model dat het mogelijk maakt uw vastgoed zonder stress te verkopen. Hoogwaardige beelden, 360° tours en transparante processen besparen u tijd en geld – zonder overbodige bezichtigingen.",
        cta: "Vraag nu de waardebepaling aan"
      },
      cost: {
        headline: "Makelaarskosten in Nederland vs. Homedex",
        text: "In Nederland liggen de gebruikelijke makelaarskosten vaak tussen de 2% en 3% voor zowel koper als verkoper. Bij Homedex betaalt elke partij slechts 1%, wat resulteert in aanzienlijke besparingen."
      },
      footer: {
        copyright: "© 2025 Homedex. Alle rechten voorbehouden.",
        privacy: "Privacybeleid",
        impressum: "Impressum"
      }
    },
    pl: {
      header: {
        home: "Strona główna",
        submit: "Zgłoś nieruchomość",
        login: "Logowanie",
        admin: "Panel administracyjny"
      },
      hero: {
        title: "Sprzedaj swoją nieruchomość cyfrowo – szybko, przejrzyście i efektywnie kosztowo!",
        description: "Dzięki Homedex korzystasz z innowacyjnego modelu online, który umożliwia sprzedaż nieruchomości bez stresu. Wysokiej jakości zdjęcia, wirtualne wycieczki 360° i przejrzyste procesy pozwalają zaoszczędzić czas i pieniądze – bez niepotrzebnych oględzin.",
        cta: "Oceń swoją nieruchomość już teraz"
      },
      cost: {
        headline: "Prowizje agencji nieruchomości w Polsce vs. Homedex",
        text: "W Polsce tradycyjne prowizje agencji nieruchomości wynoszą zazwyczaj od 3% do 6% zarówno dla kupujących, jak i sprzedających. Dzięki Homedex obie strony płacą tylko 1%, czyli łącznie 2%."
      },
      footer: {
        copyright: "© 2025 Homedex. Wszelkie prawa zastrzeżone.",
        privacy: "Polityka prywatności",
        impressum: "Impresum"
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

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
            <option value="pl">Polski</option>
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
