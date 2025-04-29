const cu3 = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
if (!cu3 || cu3.role !== 'admin') location.href = 'login.html';

async function loadAdminListings() {
  const all = await (await fetch(`${API}/listings`)).json();
  document.getElementById('adminListings').innerHTML = all.map(l =>
    `<div class="card"><h4>${l.title}</h4><p>${l.location}</p><p>€${l.price}</p><button onclick="toggleSold(${l.id})">${l.sold ? 'Reaktivieren' : 'Verkauft'}</button></div>`
  ).join('');
}

async function loadInquiries() {
  const qs = await (await fetch(`${API}/inquiries`)).json();
  document.getElementById('aiInquiries').innerHTML = qs.map(q =>
    `<div class="card"><p>${q.email}: ${q.question}</p><textarea id="ans${q.id}" placeholder="Antwort..."></textarea><button onclick="answer(${q.id})">Antwort senden</button></div>`
  ).join('');
}

window.toggleSold = async id => {
  const item = await (await fetch(`${API}/listings/${id}`)).json();
  item.sold = !item.sold;
  await fetch(`${API}/listings/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item) });
  loadAdminListings();
};

window.answer = async id => {
  const q = await (await fetch(`${API}/inquiries/${id}`)).json();
  q.answer = document.getElementById('ans' + id).value;
  await fetch(`${API}/inquiries/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(q) });
  alert('Antwort gespeichert');
};

async function showRevenue() {
  const sold = await (await fetch(`${API}/listings?sold=true`)).json();
  const rev = sold.reduce((sum, x) => sum + x.price, 0);
  document.getElementById('revenueStats').innerText = `Gesamtumsatz: €${rev}`;
}

loadAdminListings();
loadInquiries();
showRevenue();

