const cu = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
if (!cu || cu.role !== 'client') location.href = 'login.html';

document.getElementById('applyFilters').onclick = async () => {
  const city = document.getElementById('filterCity').value;
  const price = document.getElementById('filterPrice').value;
  let url = `${API}/listings?owner=${encodeURIComponent(cu.email)}`;
  if (city) url += `&location_like=${encodeURIComponent(city)}`;
  if (price) url += `&price_lte=${price}`;
  renderListings(await (await fetch(url)).json(), 'allListings');
};

document.getElementById('sellForm').onsubmit = async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.price = parseFloat(data.price);
  data.size = parseFloat(data.size);
  data.owner = cu.email;
  data.sold = false;
  await fetch(`${API}/listings`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
  loadMyListings();
};

async function loadMyListings() {
  renderListings(await (await fetch(`${API}/listings?owner=${encodeURIComponent(cu.email)}`)).json(), 'myListings');
}

function renderListings(arr, id) {
  document.getElementById(id).innerHTML = arr.map(l => `<div class="card"><h4>${l.title}</h4><p>${l.location}</p><p>€${l.price}</p></div>`).join('');
}
loadMyListings();

