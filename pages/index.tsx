// pages/index.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <div className="logo text-2xl font-bold">
          Immobilien Europe
        </div>
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
          <select className="border p-1 rounded">
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
          Verkaufen Sie Ihre Immobilie stressfrei – 100% online!
        </h1>
        <p className="text-lg mb-6">
          Nutzen Sie unsere innovative Plattform, um Ihre Immobilie in ganz Europa digital zu verkaufen.
          Keine Besichtigungen, keine Maklergebühren – nur einfache, transparente Prozesse.
        </p>
        <Link href="/submit">
          <a className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Jetzt Immobilie bewerten lassen
          </a>
        </Link>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center border-t pt-4">
        <p>© 2025 Immobilien Europe. Alle Rechte vorbehalten.</p>
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

