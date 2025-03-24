// pages/login.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("de");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sprache aus localStorage laden (Standard: "de")
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

  // Manuelle Übersetzungen für die Login-Seite
  const translations = {
    de: {
      login: {
        title: "Login",
        email: "E-Mail",
        password: "Passwort",
        submit: "Anmelden",
        registerPrompt: "Noch kein Konto? Jetzt registrieren!"
      }
    },
    en: {
      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        submit: "Sign In",
        registerPrompt: "Don't have an account? Register now!"
      }
    },
    fr: {
      login: {
        title: "Connexion",
        email: "E-mail",
        password: "Mot de passe",
        submit: "Se connecter",
        registerPrompt: "Pas de compte ? Inscrivez-vous !"
      }
    },
    es: {
      login: {
        title: "Acceso",
        email: "Correo electrónico",
        password: "Contraseña",
        submit: "Acceder",
        registerPrompt: "¿No tienes cuenta? ¡Regístrate!"
      }
    },
    it: {
      login: {
        title: "Accesso",
        email: "Email",
        password: "Password",
        submit: "Accedi",
        registerPrompt: "Non hai un account? Registrati ora!"
      }
    },
    nl: {
      login: {
        title: "Inloggen",
        email: "E-mail",
        password: "Wachtwoord",
        submit: "Inloggen",
        registerPrompt: "Heb je nog geen account? Registreer nu!"
      }
    },
    pl: {
      login: {
        title: "Logowanie",
        email: "E-mail",
        password: "Hasło",
        submit: "Zaloguj się",
        registerPrompt: "Nie masz konta? Zarejestruj się teraz!"
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
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      alert("Login fehlgeschlagen");
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
        <h1 className="text-3xl font-bold mb-4">{t.login.title}</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            {t.login.email}:
            <input 
              type="email" 
              className="w-full p-2 border mt-1" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
            />
          </label>
          <label className="block mb-4">
            {t.login.password}:
            <input 
              type="password" 
              className="w-full p-2 border mt-1" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
            />
          </label>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            {t.login.submit}
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link href="/register">
            <a className="text-blue-600 underline">{t.login.registerPrompt}</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
