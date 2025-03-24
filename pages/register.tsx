// pages/register.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("de");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Sprache aus localStorage laden (Standard: "de")
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

  // Manuelle Übersetzungen für die Registrierungsseite
  const translations = {
    de: {
      register: {
        title: "Registrierung",
        fullName: "Vollständiger Name",
        email: "E-Mail",
        password: "Passwort",
        confirmPassword: "Passwort bestätigen",
        phone: "Telefonnummer (optional)",
        submit: "Registrieren",
        loginPrompt: "Bereits registriert? Jetzt anmelden!"
      }
    },
    en: {
      register: {
        title: "Register",
        fullName: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        phone: "Phone (optional)",
        submit: "Register",
        loginPrompt: "Already have an account? Sign in!"
      }
    },
    fr: {
      register: {
        title: "Inscription",
        fullName: "Nom complet",
        email: "E-mail",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        phone: "Téléphone (optionnel)",
        submit: "S'inscrire",
        loginPrompt: "Déjà inscrit ? Connectez-vous !"
      }
    },
    es: {
      register: {
        title: "Registro",
        fullName: "Nombre completo",
        email: "Correo electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar contraseña",
        phone: "Teléfono (opcional)",
        submit: "Registrarse",
        loginPrompt: "¿Ya tienes cuenta? ¡Inicia sesión!"
      }
    },
    it: {
      register: {
        title: "Registrazione",
        fullName: "Nome completo",
        email: "Email",
        password: "Password",
        confirmPassword: "Conferma Password",
        phone: "Telefono (opzionale)",
        submit: "Registrati",
        loginPrompt: "Hai già un account? Accedi!"
      }
    },
    nl: {
      register: {
        title: "Registratie",
        fullName: "Volledige naam",
        email: "E-mail",
        password: "Wachtwoord",
        confirmPassword: "Bevestig wachtwoord",
        phone: "Telefoon (optioneel)",
        submit: "Registreren",
        loginPrompt: "Heb je al een account? Log in!"
      }
    },
    pl: {
      register: {
        title: "Rejestracja",
        fullName: "Pełne imię i nazwisko",
        email: "E-mail",
        password: "Hasło",
        confirmPassword: "Potwierdź hasło",
        phone: "Telefon (opcjonalnie)",
        submit: "Zarejestruj się",
        loginPrompt: "Masz już konto? Zaloguj się!"
      }
    }
  };

  const t = translations[language];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    const registrationData = { fullName, email, password, phone, language };
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(registrationData)
    });
    const data = await res.json();
    if (data.success) {
      router.push("/login");
    } else {
      alert("Registrierung fehlgeschlagen: " + data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b">
        <div className="logo text-2xl font-bold">Homedex</div>
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

      <main className="mt-10 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">{t.register.title}</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            {t.register.fullName}:
            <input 
              type="text" 
              className="w-full p-2 border mt-1" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-2">
            {t.register.email}:
            <input 
              type="email" 
              className="w-full p-2 border mt-1" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-2">
            {t.register.password}:
            <input 
              type="password" 
              className="w-full p-2 border mt-1" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-2">
            {t.register.confirmPassword}:
            <input 
              type="password" 
              className="w-full p-2 border mt-1" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-4">
            {t.register.phone}:
            <input 
              type="tel" 
              className="w-full p-2 border mt-1" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </label>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            {t.register.submit}
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link href="/login">
            <a className="text-blue-600 underline">{t.register.loginPrompt}</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
