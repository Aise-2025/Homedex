import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { LanguageContext } from '../context/LanguageContext';

const LoginPage = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const texts = {
    de: {
      title: "Login",
      emailLabel: "E-Mail",
      passwordLabel: "Passwort",
      loginButton: "Einloggen",
      noAccount: "Noch keinen Account?",
      register: "Jetzt registrieren",
    },
    en: {
      title: "Login",
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: "Log In",
      noAccount: "Don't have an account?",
      register: "Register now",
    },
  };

  // Fallback auf Englisch, falls lang nicht definiert ist
  const selectedTexts = texts[lang] || texts.en;

  // Decode JWT nur im Client ausführen
  const decodeJWT = (token) => {
    if (typeof window === "undefined") return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        Array.prototype.map
          .call(window.atob(base64), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Fehler beim Decodieren des Tokens:', e);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Fehler beim Login');
      } else {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        const payload = decodeJWT(data.token);
        // Weiterleitung basierend auf der Rolle
        if (payload && payload.role === 'employee') {
          router.push('/dashboard');
        } else {
          router.push('/homeafterlogin');
        }
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten.');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>{selectedTexts.title}</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            {selectedTexts.emailLabel}
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            {selectedTexts.passwordLabel}
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>{selectedTexts.loginButton}</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={styles.text}>
          {selectedTexts.noAccount} <a href="/register">{selectedTexts.register}</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '80px',
    padding: '20px',
    maxWidth: '400px',
    margin: '80px auto',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    marginTop: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  text: {
    marginTop: '15px',
  }
};

export default LoginPage;
