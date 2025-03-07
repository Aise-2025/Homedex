// /pages/_app.js
import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;

