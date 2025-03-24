// pages/login.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("de");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sprache aus localStorage laden
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

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
    }
    // Weitere Sprachen können hier ergänzt werden
  };

  const t = translations[language];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API-Aufruf zum Einloggen
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
          <select className="border p-1 rounded" value={language} onChange={handleLanguageChange}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            {/* Weitere Sprachen */}
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

