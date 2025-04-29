const cu2 = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
if (!cu2 || cu2.role !== 'employee') location.href = 'login.html';

async function loadAll() {
  const all = await (await fetch(`${API}/listings`)).json();
  document.getElementById('manageListings').innerHTML = all.map(l =>
    `<div class="card"><h4>${l.title}</h4><p>${l.location}</p><button onclick="toggleSold(${l.id})">${l.sold ? 'Reaktivieren' : 'Verkauft'}</button></div>`
  ).join('');
}

window.toggleSold = async id => {
  const item = await (await fetch(`${API}/listings/${id}`)).json();
  item.sold = !item.sold;
  await fetch(`${API}/listings/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item) });
  loadAll();
};

loadAll();

