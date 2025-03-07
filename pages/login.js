// /pages/login.js
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier die Login-Logik einfügen, z.B. API-Call
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1>{texts[lang].title}</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            {texts[lang].emailLabel}
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            {texts[lang].passwordLabel}
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>{texts[lang].loginButton}</button>
        </form>
        <p style={styles.text}>
          {texts[lang].noAccount} <a href="/register">{texts[lang].register}</a>
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
