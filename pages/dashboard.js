import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { LanguageContext } from '../context/LanguageContext';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const { lang } = useContext(LanguageContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("newDirect"); // Tabs: newDirect, newMarketing, soldDirect, soldMarketing, overall, employees
  const [sales, setSales] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Zustände für Mitarbeiterformular
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPassword, setEmpPassword] = useState('');

  // Verkaufsanfragen laden (aus /api/sell, z. B. aus LowDB)
  useEffect(() => {
    fetch('/api/sell')
      .then(res => res.json())
      .then(data => {
        const salesData = Array.isArray(data) ? data : data.sales;
        setSales(salesData);
      })
      .catch(err => console.error("Error fetching sales:", err));
  }, []);

  // Mitarbeiter laden (aus /api/employees)
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        const empData = Array.isArray(data) ? data : data.employees;
        setEmployees(empData);
      })
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  // Filtern nach Status und Angebotsart
  const newDirect = sales.filter(sale => sale.status === "new" && sale.offerType === "angebot");
  const newMarketing = sales.filter(sale => sale.status === "new" && sale.offerType === "vermarktung");
  const soldDirect = sales.filter(sale => sale.status === "sold" && sale.offerType === "angebot");
  const soldMarketing = sales.filter(sale => sale.status === "sold" && sale.offerType === "vermarktung");

  // Gesamtdiagramm: Monatliche Verkaufszahlen (über beide Bereiche)
  const getChartData = () => {
    const allSold = [...soldDirect, ...soldMarketing];
    const monthlyCounts = {};
    allSold.forEach(sale => {
      // Annahme: sale.timestamp ist ein Zeitstempel in ms
      const date = new Date(sale.timestamp);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    const labels = Object.keys(monthlyCounts).sort();
    const data = labels.map(label => monthlyCounts[label]);
    return {
      labels,
      datasets: [{
        label: lang === 'de' ? "Verkaufte Immobilien pro Monat" : "Sold Properties per Month",
        data,
        backgroundColor: '#0070f3'
      }]
    };
  };

  // Aktionen für Verkaufsanfragen
  const handleAccept = (saleId) => {
    fetch('/api/updateSale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: saleId, action: "accept" })
    })
      .then(res => res.json())
      .then(() => router.reload());
  };

  const handleChangePrice = (saleId) => {
    const newPrice = prompt(lang === 'de' ? "Neuen Preis eingeben:" : "Enter new price:");
    if (newPrice) {
      fetch('/api/updateSale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: saleId, action: "changePrice", newPrice })
      })
        .then(res => res.json())
        .then(() => router.reload());
    }
  };

  // KI-Bewertung: Es wird jetzt zusätzlich der aktuelle Preis übergeben.
  const handleKIEvaluate = (saleId, currentPrice) => {
    fetch('/api/aiEvaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: saleId, price: currentPrice })
    })
      .then(res => res.json())
      .then(data => {
        alert(lang === 'de' ? `KI-Preis: €${data.aiPrice}` : `AI Price: €${data.aiPrice}`);
      });
  };

  // "Verkauft" Aktion: Markiert eine Anfrage als verkauft
  const handleMarkSold = (saleId) => {
    fetch('/api/updateSale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: saleId, action: "markSold" })
    })
      .then(res => res.json())
      .then(() => router.reload());
  };

  // Mitarbeiter erstellen
  const handleCreateEmployee = (e) => {
    e.preventDefault();
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email: empEmail, password: empPassword })
    })
      .then(res => res.json())
      .then(() => {
        alert(lang === 'de' ? "Mitarbeiter erstellt" : "Employee created");
        setFirstName('');
        setLastName('');
        setEmpEmail('');
        setEmpPassword('');
        router.reload();
      });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Texte in beiden Sprachen
  const texts = {
    de: {
      tabNewDirect: "Neue Anfragen (Direkt)",
      tabNewMarketing: "Neue Vermarktung",
      tabSoldDirect: "Verkaufte Direktkäufe",
      tabSoldMarketing: "Verkaufte Vermarktung",
      tabOverall: "Gesamtübersicht",
      tabEmployees: "Mitarbeiterverwaltung",
      newDirectHeader: "Neue Verkaufsanfragen (Direkt)",
      newMarketingHeader: "Neue Vermarktungsanfragen",
      soldDirectHeader: "Verkaufte Immobilien (Direkt)",
      soldMarketingHeader: "Verkaufte Immobilien (Vermarktung)",
      overallHeader: "Monatliche Verkaufsübersicht",
      employeesHeader: "Mitarbeiter verwalten",
      noRequests: "Keine Anfragen vorhanden.",
      createEmployee: "Mitarbeiter anlegen",
      existingEmployees: "Bestehende Mitarbeiter",
      noEmployees: "Keine Mitarbeiter vorhanden."
    },
    en: {
      tabNewDirect: "New Direct Requests",
      tabNewMarketing: "New Marketing Requests",
      tabSoldDirect: "Sold Properties (Direct)",
      tabSoldMarketing: "Sold Properties (Marketing)",
      tabOverall: "Overall",
      tabEmployees: "Employee Management",
      newDirectHeader: "New Direct Sale Requests",
      newMarketingHeader: "New Marketing Requests",
      soldDirectHeader: "Sold Properties (Direct)",
      soldMarketingHeader: "Sold Properties (Marketing)",
      overallHeader: "Monthly Sales Overview",
      employeesHeader: "Manage Employees",
      noRequests: "No requests available.",
      createEmployee: "Create Employee",
      existingEmployees: "Existing Employees",
      noEmployees: "No employees available."
    }
  };

  // Einfaches Bildkarussell für Verkaufsanfragen
  const PropertyCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);
    if (!images || images.length === 0) return null;
    const nextImage = () => setCurrent((current + 1) % images.length);
    const prevImage = () => setCurrent((current - 1 + images.length) % images.length);
    return (
      <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
        <img src={images[current]} alt={`Image ${current + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} style={carouselButtonStyles.left}>◀</button>
            <button onClick={nextImage} style={carouselButtonStyles.right}>▶</button>
          </>
        )}
      </div>
    );
  };

  const carouselButtonStyles = {
    left: {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      padding: '5px'
    },
    right: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      padding: '5px'
    }
  };

  return (
    <div>
      <Navbar toggleLanguage={() => {}} currentLang={lang} />
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div style={styles.dashboardContainer}>
        <div style={styles.tabBar}>
          <button style={activeTab === "newDirect" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("newDirect")}>
            {texts[lang].tabNewDirect}
          </button>
          <button style={activeTab === "newMarketing" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("newMarketing")}>
            {texts[lang].tabNewMarketing}
          </button>
          <button style={activeTab === "soldDirect" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("soldDirect")}>
            {texts[lang].tabSoldDirect}
          </button>
          <button style={activeTab === "soldMarketing" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("soldMarketing")}>
            {texts[lang].tabSoldMarketing}
          </button>
          <button style={activeTab === "overall" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("overall")}>
            {texts[lang].tabOverall}
          </button>
          <button style={activeTab === "employees" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("employees")}>
            {texts[lang].tabEmployees}
          </button>
        </div>
        <div style={styles.tabContent}>
          {activeTab === "newDirect" && (
            <div>
              <h2>{texts[lang].newDirectHeader}</h2>
              {newDirect.length === 0 ? (
                <p>{texts[lang].noRequests}</p>
              ) : (
                newDirect.map(sale => (
                  <div key={sale.id} style={styles.requestCard}>
                    <h3>{sale.address} - {sale.country}</h3>
                    <p>{lang === 'de' ? "Preis:" : "Price:"} €{sale.price}</p>
                    <div style={styles.buttonGroup}>
                      <button style={styles.actionButton} onClick={() => handleAccept(sale.id)}>
                        {lang === 'de' ? "Annehmen" : "Accept"}
                      </button>
                      <button style={styles.actionButton} onClick={() => handleChangePrice(sale.id)}>
                        {lang === 'de' ? "Preis ändern" : "Change Price"}
                      </button>
                      <button style={styles.actionButton} onClick={() => handleKIEvaluate(sale.id, sale.price)}>
                        {lang === 'de' ? "KI Bewertung" : "AI Evaluate"}
                      </button>
                      <button style={styles.actionButton} onClick={() => handleMarkSold(sale.id)}>
                        {lang === 'de' ? "Verkauft" : "Mark as Sold"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "newMarketing" && (
            <div>
              <h2>{texts[lang].newMarketingHeader}</h2>
              {newMarketing.length === 0 ? (
                <p>{texts[lang].noRequests}</p>
              ) : (
                newMarketing.map(sale => (
                  <div key={sale.id} style={styles.requestCard}>
                    <h3>{sale.address} - {sale.country}</h3>
                    <p>{lang === 'de' ? "Preis:" : "Price:"} €{sale.price}</p>
                    <div style={styles.buttonGroup}>
                      <button style={styles.actionButton} onClick={() => handleKIEvaluate(sale.id, sale.price)}>
                        {lang === 'de' ? "KI Bewertung" : "AI Evaluate"}
                      </button>
                      <button style={styles.actionButton} onClick={() => handleMarkSold(sale.id)}>
                        {lang === 'de' ? "Verkauft" : "Mark as Sold"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "soldDirect" && (
            <div>
              <h2>{texts[lang].soldDirectHeader}</h2>
              {soldDirect.length === 0 ? (
                <p>{texts[lang].noRequests}</p>
              ) : (
                soldDirect.map(sale => (
                  <div key={sale.id} style={styles.requestCard}>
                    <h3>{sale.address} - {sale.country}</h3>
                    <p>{lang === 'de' ? "Preis:" : "Price:"} €{sale.price}</p>
                    <button style={styles.actionButton} onClick={() => handleKIEvaluate(sale.id, sale.price)}>
                      {lang === 'de' ? "KI Bewertung" : "AI Evaluate"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "soldMarketing" && (
            <div>
              <h2>{texts[lang].soldMarketingHeader}</h2>
              {soldMarketing.length === 0 ? (
                <p>{texts[lang].noRequests}</p>
              ) : (
                soldMarketing.map(sale => (
                  <div key={sale.id} style={styles.requestCard}>
                    <h3>{sale.address} - {sale.country}</h3>
                    <p>{lang === 'de' ? "Preis:" : "Price:"} €{sale.price}</p>
                    <button style={styles.actionButton} onClick={() => handleKIEvaluate(sale.id, sale.price)}>
                      {lang === 'de' ? "KI Bewertung" : "AI Evaluate"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "overall" && (
            <div>
              <h2>{texts[lang].overallHeader}</h2>
              <Bar data={getChartData()} />
            </div>
          )}
          {activeTab === "employees" && (
            <div>
              <h2>{texts[lang].employeesHeader}</h2>
              <form onSubmit={handleCreateEmployee} style={styles.employeeForm}>
                <input 
                  type="text" 
                  placeholder={lang === 'de' ? "Vorname" : "First Name"} 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                  style={styles.employeeInput}
                />
                <input 
                  type="text" 
                  placeholder={lang === 'de' ? "Nachname" : "Last Name"} 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  required 
                  style={styles.employeeInput}
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={empEmail} 
                  onChange={(e) => setEmpEmail(e.target.value)} 
                  required 
                  style={styles.employeeInput}
                />
                <input 
                  type="password" 
                  placeholder={lang === 'de' ? "Passwort" : "Password"} 
                  value={empPassword} 
                  onChange={(e) => setEmpPassword(e.target.value)} 
                  required 
                  style={styles.employeeInput}
                />
                <button type="submit" style={styles.employeeButton}>
                  {texts[lang].createEmployee}
                </button>
              </form>
              <h3>{texts[lang].existingEmployees}</h3>
              {employees.length === 0 ? (
                <p>{texts[lang].noEmployees}</p>
              ) : (
                employees.map(emp => (
                  <div key={emp.id} style={styles.employeeCard}>
                    <p>{emp.firstName} {emp.lastName}</p>
                    <p>{emp.email}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  dashboardContainer: {
    padding: '20px',
    marginTop: '60px'
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px'
  },
  tabButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
  },
  activeTabButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#005bb5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
  },
  tabContent: {
    marginTop: '20px'
  },
  requestCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  actionButton: {
    padding: '8px 15px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  employeeForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    marginBottom: '20px'
  },
  employeeInput: {
    padding: '10px',
    fontSize: '1em'
  },
  employeeButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  employeeCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px'
  },
  filterContainer: {
    flex: '1',
    paddingRight: '20px',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderRight: '1px solid #ddd'
  },
  filterField: {
    marginBottom: '15px'
  },
  filterInput: {
    width: '100%',
    padding: '8px',
    marginTop: '5px'
  },
  listContainer: {
    flex: '3',
    paddingLeft: '20px'
  },
  propertyCard: {
    display: 'block',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '10px',
    textDecoration: 'none',
    color: '#000'
  }
};

export default Dashboard;
