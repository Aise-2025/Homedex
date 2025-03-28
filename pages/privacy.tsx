// pages/privacy.tsx
export {}; // Damit wird die Datei als Modul behandelt

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Translations {
  privacy: {
    title: string;
    content: string;
    backLink: string;
  };
}

export default function PrivacyPage() {
  const [language, setLanguage] = useState("de");

  // Sprache aus localStorage laden (Standard: "de")
  useEffect(() => {
    const lang = localStorage.getItem("language") || "de";
    setLanguage(lang);
  }, []);

  const translations: { [key: string]: Translations } = {
    de: {
      privacy: {
        title: "Datenschutzerklärung",
        content: `Wir bei Homedex nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
Diese Datenschutzerklärung informiert Sie umfassend über die Verarbeitung Ihrer personenbezogenen Daten auf unserer Website.

1. **Verantwortlicher:**  
Homedex, Musterstraße 123, 12345 Musterstadt, Deutschland  
E-Mail: info@homedex.de

2. **Erhebung und Speicherung personenbezogener Daten:**  
Beim Besuch unserer Website werden automatisch technische Daten wie IP-Adresse, Browsertyp und Zugriffszeiten in Server-Logfiles gespeichert. Darüber hinaus erheben wir personenbezogene Daten, wenn Sie ein Konto erstellen, eine Anfrage senden oder unsere Dienstleistungen nutzen.

3. **Verwendung Ihrer Daten:**  
Ihre Daten werden verwendet, um Ihnen unsere Dienste bereitzustellen, Ihre Anfragen zu bearbeiten, sowie um die Sicherheit und Funktionalität unserer Website zu gewährleisten. 
Daten können auch für Analysezwecke und zur Verbesserung unseres Angebots verarbeitet werden.

4. **Cookies und Tracking:**  
Wir verwenden Cookies, um Ihre Nutzererfahrung zu verbessern und um Analyse-Dienste (z.B. Google Analytics) zu ermöglichen. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie können die Verwendung von Cookies in den Einstellungen Ihres Browsers einschränken oder deaktivieren.

5. **Weitergabe an Dritte:**  
Ihre Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben, es sei denn, dies ist zur Erfüllung unserer vertraglichen Pflichten oder aufgrund gesetzlicher Vorschriften erforderlich.

6. **Ihre Rechte:**  
Sie haben das Recht, Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten, deren Berichtigung oder Löschung zu verlangen sowie der Verarbeitung Ihrer Daten zu widersprechen. Bitte kontaktieren Sie uns hierzu unter info@homedex.de.

7. **Datensicherheit:**  
Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff und Missbrauch zu schützen.

8. **Änderungen dieser Datenschutzerklärung:**  
Wir behalten uns vor, diese Datenschutzerklärung regelmäßig anzupassen. Die jeweils aktuelle Version finden Sie auf unserer Website.

Mit der Nutzung unserer Website stimmen Sie der Verarbeitung Ihrer Daten gemäß dieser Datenschutzerklärung zu.`,
        backLink: "Zurück zur Startseite"
      }
    },
    en: {
      privacy: {
        title: "Privacy Policy",
        content: `At Homedex, we take the protection of your personal data very seriously. 
This privacy policy provides detailed information on how we process your personal data on our website.

1. **Data Controller:**  
Homedex, 123 Sample Street, 12345 Sample City, Germany  
Email: info@homedex.de

2. **Collection and Storage of Personal Data:**  
When you visit our website, technical data such as your IP address, browser type, and access times are automatically stored in server log files. We also collect personal data when you create an account, submit an inquiry, or use our services.

3. **Use of Your Data:**  
Your data is used to provide our services, process your inquiries, and ensure the security and functionality of our website. Data may also be used for analytical purposes to improve our offerings.

4. **Cookies and Tracking:**  
We use cookies to enhance your user experience and enable analytics services (e.g., Google Analytics). Cookies are small text files stored on your device. You can restrict or disable cookies in your browser settings.

5. **Disclosure to Third Parties:**  
Your data will not be shared with third parties without your explicit consent, unless required to fulfill contractual obligations or mandated by law.

6. **Your Rights:**  
You have the right to access, correct, or delete your personal data stored with us and to object to its processing. Please contact us at info@homedex.de for any inquiries.

7. **Data Security:**  
We implement technical and organizational security measures to protect your data against unauthorized access and misuse.

8. **Changes to this Privacy Policy:**  
We reserve the right to update this privacy policy regularly. The most current version will always be available on our website.

By using our website, you agree to the processing of your data in accordance with this privacy policy.`,
        backLink: "Back to Home"
      }
    },
    fr: {
      privacy: {
        title: "Politique de confidentialité",
        content: `Chez Homedex, nous prenons la protection de vos données personnelles très au sérieux. 
Cette politique de confidentialité décrit en détail comment nous traitons vos données personnelles sur notre site web.

1. **Responsable du traitement :**  
Homedex, 123 rue Exemple, 12345 Ville Exemple, Allemagne  
Email : info@homedex.de

2. **Collecte et stockage des données personnelles :**  
Lorsque vous visitez notre site, des données techniques telles que votre adresse IP, le type de navigateur et les horaires d'accès sont automatiquement enregistrées dans des fichiers journaux. Nous collectons également des données personnelles lorsque vous créez un compte, envoyez une demande ou utilisez nos services.

3. **Utilisation de vos données :**  
Vos données sont utilisées pour vous fournir nos services, traiter vos demandes et assurer la sécurité et la fonctionnalité de notre site web. Elles peuvent également être utilisées à des fins d'analyse pour améliorer nos offres.

4. **Cookies et suivi :**  
Nous utilisons des cookies pour améliorer votre expérience utilisateur et pour permettre l'analyse (par exemple, Google Analytics). Les cookies sont de petits fichiers texte stockés sur votre appareil. Vous pouvez restreindre ou désactiver l'utilisation des cookies via les paramètres de votre navigateur.

5. **Divulgation à des tiers :**  
Vos données ne seront pas communiquées à des tiers sans votre consentement explicite, sauf si cela est nécessaire pour remplir nos obligations contractuelles ou en vertu de la loi.

6. **Vos droits :**  
Vous avez le droit d'accéder à vos données personnelles, de les corriger ou de les supprimer, ainsi que de vous opposer à leur traitement. Veuillez nous contacter à l'adresse info@homedex.de pour toute demande.

7. **Sécurité des données :**  
Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé et usage abusif.

8. **Modifications de cette politique de confidentialité :**  
Nous nous réservons le droit de mettre à jour cette politique de confidentialité régulièrement. La version la plus récente sera toujours disponible sur notre site web.

En utilisant notre site, vous acceptez le traitement de vos données conformément à cette politique de confidentialité.`,
        backLink: "Retour à l'accueil"
      }
    },
    es: {
      privacy: {
        title: "Política de privacidad",
        content: `En Homedex, nos tomamos muy en serio la protección de sus datos personales. 
Esta política de privacidad describe en detalle cómo procesamos sus datos personales en nuestro sitio web.

1. **Responsable del tratamiento:**  
Homedex, 123 Calle Ejemplo, 12345 Ciudad Ejemplo, Alemania  
Correo electrónico: info@homedex.de

2. **Recogida y almacenamiento de datos personales:**  
Cuando visita nuestro sitio web, se registran automáticamente datos técnicos, como su dirección IP, tipo de navegador y horarios de acceso, en archivos de registro del servidor. Además, recopilamos datos personales cuando crea una cuenta, envía una consulta o utiliza nuestros servicios.

3. **Uso de sus datos:**  
Sus datos se utilizan para proporcionarle nuestros servicios, gestionar sus consultas y garantizar la seguridad y el funcionamiento de nuestro sitio web. También pueden utilizarse con fines analíticos para mejorar nuestras ofertas.

4. **Cookies y seguimiento:**  
Utilizamos cookies para mejorar su experiencia y habilitar servicios de análisis (por ejemplo, Google Analytics). Las cookies son pequeños archivos de texto almacenados en su dispositivo. Puede restringir o desactivar el uso de cookies en la configuración de su navegador.

5. **Divulgación a terceros:**  
Sus datos no se compartirán con terceros sin su consentimiento explícito, a menos que sea necesario para cumplir con obligaciones contractuales o exigencias legales.

6. **Sus derechos:**  
Tiene derecho a acceder, corregir o eliminar sus datos personales y a oponerse a su tratamiento. Para cualquier consulta, contáctenos en info@homedex.de.

7. **Seguridad de los datos:**  
Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos contra accesos no autorizados y usos indebidos.

8. **Cambios en esta política de privacidad:**  
Nos reservamos el derecho de actualizar esta política de privacidad periódicamente. La versión más reciente estará siempre disponible en nuestro sitio web.

Al utilizar nuestro sitio, usted acepta el tratamiento de sus datos de acuerdo con esta política de privacidad.`,
        backLink: "Volver al inicio"
      }
    },
    it: {
      privacy: {
        title: "Informativa sulla privacy",
        content: `Da Homedex, prendiamo molto sul serio la protezione dei tuoi dati personali. 
Questa informativa descrive in dettaglio come trattiamo i tuoi dati personali sul nostro sito web.

1. **Titolare del trattamento:**  
Homedex, 123 Via Esempio, 12345 Città Esempio, Germania  
Email: info@homedex.de

2. **Raccolta e conservazione dei dati personali:**  
Durante la visita al nostro sito, vengono registrati automaticamente dati tecnici come indirizzo IP, tipo di browser e orari di accesso nei file di log del server. Inoltre, raccogliamo dati personali quando crei un account, invii una richiesta o utilizzi i nostri servizi.

3. **Utilizzo dei dati:**  
I tuoi dati sono utilizzati per fornirti i nostri servizi, gestire le tue richieste e garantire la sicurezza e il funzionamento del nostro sito. Possono anche essere utilizzati a scopi analitici per migliorare le nostre offerte.

4. **Cookie e tracciamento:**  
Utilizziamo cookie per migliorare la tua esperienza e abilitare servizi di analisi (ad esempio, Google Analytics). I cookie sono piccoli file di testo memorizzati sul tuo dispositivo. Puoi limitare o disabilitare l'uso dei cookie tramite le impostazioni del browser.

5. **Divulgazione a terzi:**  
I tuoi dati non verranno condivisi con terzi senza il tuo esplicito consenso, salvo quando necessario per adempiere agli obblighi contrattuali o di legge.

6. **I tuoi diritti:**  
Hai il diritto di accedere, correggere o cancellare i tuoi dati personali e di opporti al loro trattamento. Per ulteriori informazioni, contattaci all'indirizzo info@homedex.de.

7. **Sicurezza dei dati:**  
Adottiamo misure tecniche e organizzative per proteggere i tuoi dati contro accessi non autorizzati e utilizzi impropri.

8. **Modifiche all'informativa:**  
Ci riserviamo il diritto di aggiornare periodicamente questa informativa sulla privacy. La versione più recente sarà sempre disponibile sul nostro sito.

Utilizzando il nostro sito, accetti il trattamento dei tuoi dati secondo questa informativa sulla privacy.`,
        backLink: "Torna alla Home"
      }
    },
    nl: {
      privacy: {
        title: "Privacybeleid",
        content: `Bij Homedex nemen wij de bescherming van uw persoonlijke gegevens zeer serieus. 
Dit privacybeleid legt gedetailleerd uit hoe wij uw persoonlijke gegevens verwerken op onze website.

1. **Verantwoordelijke:**  
Homedex, 123 Voorbeeldstraat, 12345 Voorbeeldstad, Duitsland  
E-mail: info@homedex.de

2. **Verzameling en opslag van persoonsgegevens:**  
Wanneer u onze website bezoekt, worden technische gegevens zoals uw IP-adres, browsertype en toegangstijden automatisch opgeslagen in serverlogboeken. Daarnaast verzamelen wij persoonsgegevens wanneer u een account aanmaakt, een vraag stelt of onze diensten gebruikt.

3. **Gebruik van uw gegevens:**  
Uw gegevens worden gebruikt om u onze diensten te leveren, uw vragen te verwerken en de veiligheid en functionaliteit van onze website te waarborgen. Ook kunnen ze voor analytische doeleinden worden gebruikt om ons aanbod te verbeteren.

4. **Cookies en tracking:**  
Wij maken gebruik van cookies om uw gebruikerservaring te verbeteren en analysetools (zoals Google Analytics) in te schakelen. Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen. U kunt het gebruik van cookies beperken of uitschakelen via de instellingen van uw browser.

5. **Delen met derden:**  
Uw gegevens worden niet met derden gedeeld zonder uw expliciete toestemming, tenzij dit noodzakelijk is voor het uitvoeren van contractuele verplichtingen of wettelijk verplicht is.

6. **Uw rechten:**  
U heeft het recht om toegang te vragen tot uw opgeslagen persoonsgegevens, deze te corrigeren of te laten verwijderen en bezwaar te maken tegen de verwerking ervan. Neem contact met ons op via info@homedex.de voor meer informatie.

7. **Gegevensbeveiliging:**  
Wij treffen technische en organisatorische maatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang en misbruik.

8. **Wijzigingen in dit privacybeleid:**  
Wij behouden ons het recht voor dit privacybeleid periodiek aan te passen. De meest recente versie is altijd beschikbaar op onze website.

Door onze website te gebruiken, stemt u in met de verwerking van uw gegevens in overeenstemming met dit privacybeleid.`,
        backLink: "Terug naar Home"
      }
    },
    pl: {
      privacy: {
        title: "Polityka prywatności",
        content: `W Homedex bardzo poważnie podchodzimy do ochrony Twoich danych osobowych. 
Niniejsza polityka prywatności opisuje szczegółowo, w jaki sposób przetwarzamy Twoje dane osobowe na naszej stronie internetowej.

1. **Administrator danych:**  
Homedex, 123 Przykładowa Ulica, 12345 Przykładowe Miasto, Niemcy  
Email: info@homedex.de

2. **Zbieranie i przechowywanie danych osobowych:**  
Podczas korzystania z naszej strony internetowej automatycznie zapisujemy dane techniczne, takie jak adres IP, typ przeglądarki oraz czasy dostępu, w logach serwera. Zbieramy również dane osobowe, gdy tworzysz konto, wysyłasz zapytanie lub korzystasz z naszych usług.

3. **Wykorzystanie Twoich danych:**  
Twoje dane są wykorzystywane do świadczenia naszych usług, przetwarzania zapytań oraz zapewnienia bezpieczeństwa i funkcjonalności strony. Mogą być również wykorzystywane do celów analitycznych w celu poprawy naszych ofert.

4. **Pliki cookies i śledzenie:**  
W naszej witrynie używamy plików cookies, aby poprawić komfort korzystania z niej oraz umożliwić działanie narzędzi analitycznych (np. Google Analytics). Pliki cookies to małe pliki tekstowe przechowywane na Twoim urządzeniu. Możesz ograniczyć lub wyłączyć używanie cookies w ustawieniach przeglądarki.

5. **Udostępnianie danych osobowych:**  
Twoje dane nie będą udostępniane osobom trzecim bez Twojej wyraźnej zgody, chyba że jest to niezbędne do realizacji naszych zobowiązań umownych lub wymagane przez prawo.

6. **Twoje prawa:**  
Masz prawo do dostępu do swoich danych osobowych, ich poprawiania, usunięcia oraz wniesienia sprzeciwu wobec ich przetwarzania. Wszelkie pytania prosimy kierować na adres info@homedex.de.

7. **Bezpieczeństwo danych:**  
Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane przed nieautoryzowanym dostępem oraz nieuprawnionym użyciem.

8. **Zmiany w polityce prywatności:**  
Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. Aktualna wersja będzie zawsze dostępna na naszej stronie internetowej.

Korzystając z naszej strony, wyrażasz zgodę na przetwarzanie swoich danych osobowych zgodnie z niniejszą polityką prywatności.`,
        backLink: "Powrót do strony głównej"
      }
    }
  };

  const t = translations[language].privacy;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
      <p className="mb-6 whitespace-pre-line">{t.content}</p>
      <Link href="/">
        <a className="text-blue-600 underline">{t.backLink}</a>
      </Link>
    </div>
  );
}

