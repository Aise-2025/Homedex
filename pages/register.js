// /pages/register.js
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const texts = {
    de: {
      title: "Registrierung",
      emailLabel: "E-Mail",
      passwordLabel: "Passwort",
      confirmPasswordLabel: "Passwort bestätigen",
      registerButton: "Registrieren",
      haveAccount: "Bereits einen Account?",
      login: "Jetzt einloggen",
    },
    en: {
      title: "Register",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      registerButton: "Register",
      haveAccount: "Already have an account?",
      login: "Log in now",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier die Registrierungslogik einfügen, z.B. API-Call
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
          <label style={styles.label}>
            {texts[lang].confirmPasswordLabel}
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>{texts[lang].registerButton}</button>
        </form>
        <p style={styles.text}>
          {texts[lang].haveAccount} <a href="/login">{texts[lang].login}</a>
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

export default RegisterPage;
